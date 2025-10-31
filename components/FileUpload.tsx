import React, { useState, useRef } from 'react';
import { PatientData } from '../types';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onAnalyze: (file: File, patientData: PatientData) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalyze, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [patientData, setPatientData] = useState<PatientData>({ age: null, sex: null });
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (['image/jpeg', 'image/png', 'application/pdf'].includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Por favor, sube un tipo de archivo válido (JPEG, PNG, PDF).');
        setFile(null);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
       const droppedFile = event.dataTransfer.files[0];
       if (['image/jpeg', 'image/png', 'application/pdf'].includes(droppedFile.type)) {
         setFile(droppedFile);
         setError('');
       } else {
         setError('Por favor, sube un tipo de archivo válido (JPEG, PNG, PDF).');
         setFile(null);
       }
    }
  };

  const handleAnalyzeClick = () => {
    if (!file) {
      setError('Por favor, selecciona un archivo para analizar.');
      return;
    }
    if (!patientData.age || !patientData.sex) {
      setError('Por favor, proporciona la edad y el sexo del paciente para una interpretación precisa.');
      return;
    }
    setError('');
    onAnalyze(file, patientData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">1. Información del Paciente</h3>
          <p className="text-sm text-gray-500">Esto ayuda a la IA a proporcionar un contexto más preciso.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
              <input
                type="number"
                id="age"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="ej., 45"
                onChange={(e) => setPatientData({ ...patientData, age: parseInt(e.target.value) || null })}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sexo</label>
              <select
                id="sex"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-50 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                onChange={(e) => setPatientData({ ...patientData, sex: e.target.value as PatientData['sex'] })}
                defaultValue=""
                disabled={isLoading}
              >
                <option value="" disabled>Seleccionar...</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </select>
            </div>
          </div>
        </div>

        <div>
            <h3 className="text-lg font-medium text-gray-900">2. Subir Informe de Laboratorio</h3>
            <div
                className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${file ? 'bg-green-50 border-green-400' : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Sube un archivo</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} ref={fileInputRef} accept="image/png, image/jpeg, application/pdf" disabled={isLoading} />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF hasta 10MB</p>
                    {file && <p className="text-sm font-medium text-green-700 pt-2">Archivo seleccionado: {file.name}</p>}
                </div>
            </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading || !file || !patientData.age || !patientData.sex}
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analizando...' : <><UploadIcon /> Analizar Informe</>}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;