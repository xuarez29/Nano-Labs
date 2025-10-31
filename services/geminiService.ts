import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { PatientData, LabReport, Analyte } from '../types';

// Fix: Initialize GoogleGenAI with API_KEY from environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const analyteSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: 'Nombre del analito (ej., "Glucosa", "Hemoglobina A1c")' },
        value: { type: Type.STRING, description: 'El valor medido del analito.' },
        unit: { type: Type.STRING, description: 'La unidad de medida (ej., "mg/dL", "g/dL").' },
        range: { type: Type.STRING, description: 'El rango de referencia normal (ej., "70-99").' },
        status: { type: Type.STRING, description: 'Estado del resultado (ej., "Normal", "Alto", "Bajo", "Límite").', enum: ['Normal', 'Alto', 'Bajo', 'Límite'] },
        explanation: { type: Type.STRING, description: 'Una breve explicación en una oración sobre lo que mide este analito, en español.' }
    },
    required: ['name', 'value', 'unit', 'range', 'status', 'explanation']
};

export const analyzeLabReport = async (file: File, patientData: PatientData): Promise<LabReport> => {
  try {
    const imagePart = await fileToGenerativePart(file);

    const extractionPrompt = `
      Eres una IA experta en el análisis de informes de laboratorio médico. Tu tarea es extraer meticulosamente analitos específicos de la imagen del informe de laboratorio proporcionada.
      Toda la salida debe ser en español.
      Contexto del paciente: Edad: ${patientData.age}, Sexo: ${patientData.sex}.
      
      Extrae todos los resultados de laboratorio disponibles de la imagen y estructúralos de acuerdo con el esquema JSON proporcionado. Presta mucha atención a los valores, unidades y rangos de referencia. 
      Determina el estado (Normal, Alto, Bajo, Límite) comparando el valor con el rango de referencia, considerando los datos del paciente si es relevante.
      Proporciona una breve explicación de una oración sobre el propósito de cada analito, en español.
      
      Si un valor falta o es ilegible, omite ese analito del resultado. No adivines ni inventes datos.
    `;

    const extractionResult: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { text: extractionPrompt },
                imagePart,
            ],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    analytes: {
                        type: Type.ARRAY,
                        items: analyteSchema
                    }
                }
            }
        },
    });

    const extractedData = JSON.parse(extractionResult.text);
    const analytes: Analyte[] = extractedData.analytes;

    if (!analytes || analytes.length === 0) {
      throw new Error("No se pudieron extraer analitos. El informe podría estar borroso o en un formato no compatible.");
    }

    const interpretationPrompt = `
      Eres un asistente médico de IA compasivo. Basado en los siguientes resultados de laboratorio estructurados para un(a) paciente de ${patientData.age} años de sexo ${patientData.sex}, genera tres resúmenes en español.
      
      Datos Extraídos:
      ${JSON.stringify(analytes, null, 2)}
      
      1.  **Resumen para el Paciente:** Escribe un resumen claro, simple y tranquilizador en un lenguaje sencillo y en español. Evita la jerga médica. Explica qué significan los resultados clave, especialmente aquellos que están fuera del rango normal. Comienza con los hallazgos más importantes. NO proporciones un diagnóstico ni consejos médicos. Enfatiza que estos resultados deben ser discutidos con su médico.
      
      2.  **Resumen para el Médico:** Escribe un resumen técnico y conciso en español para un médico. Destaca los hallazgos anormales, lista los valores clave y menciona posibles áreas de preocupación para seguimiento. Usa terminología médica profesional.

      3.  **Recomendación de Especialista:** Basado en los hallazgos más significativos (especialmente los valores marcadamente anormales), sugiere qué tipo de especialista médico sería apropiado consultar (ej., "Endocrinólogo", "Cardiólogo", "Nefrólogo", "Urólogo"). Si todos los resultados son normales, indica que un médico de cabecera o de atención primaria es suficiente para el seguimiento de rutina. Mantén la recomendación concisa y amigable.
      
      Devuelve la respuesta como un objeto JSON con tres claves: "patientSummary", "doctorSummary" y "specialistRecommendation". Los valores de estas claves deben estar en español.
    `;

    const interpretationResult = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: interpretationPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    patientSummary: { type: Type.STRING },
                    doctorSummary: { type: Type.STRING },
                    specialistRecommendation: { type: Type.STRING }
                },
                required: ['patientSummary', 'doctorSummary', 'specialistRecommendation']
            }
        },
    });

    const summaries = JSON.parse(interpretationResult.text);

    return {
      analytes,
      patientSummary: summaries.patientSummary,
      doctorSummary: summaries.doctorSummary,
      specialistRecommendation: summaries.specialistRecommendation,
    };
  } catch (error) {
    console.error("Error in Gemini Service:", error);
    if (error instanceof Error && error.message.includes("429")) {
        throw new Error("El servicio está actualmente ocupado. Por favor, inténtalo de nuevo en un momento.");
    }
    throw new Error("No se pudo analizar el informe de laboratorio. Asegúrate de que el archivo subido sea una imagen clara o un PDF de un informe de laboratorio.");
  }
};