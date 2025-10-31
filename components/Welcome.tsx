import React from 'react';
import { DocumentTextIcon, SparklesIcon, ChartIcon } from './icons';

const Welcome = () => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <div className="text-center">
             <svg className="mx-auto h-16 w-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Descubre la Información Clave en tus Informes</h2>
            <p className="mt-2 text-md text-gray-600">
                Comienza proporcionando los datos del paciente y subiendo tu informe. Nuestra IA se encargará del resto.
            </p>
        </div>

        <div className="mt-10">
            <h3 className="text-lg font-semibold text-center text-gray-800">Cómo Funciona</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <DocumentTextIcon />
                    </div>
                    <h4 className="mt-4 text-md font-medium text-gray-900">1. Sube tu Informe</h4>
                    <p className="mt-1 text-sm text-gray-500">Ingresa la información del paciente y sube un PDF o imagen de tu informe.</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <SparklesIcon />
                    </div>
                    <h4 className="mt-4 text-md font-medium text-gray-900">2. Análisis con IA</h4>
                    <p className="mt-1 text-sm text-gray-500">Nuestra IA extrae los datos, identifica marcadores clave y genera resúmenes.</p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                        <ChartIcon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-4 text-md font-medium text-gray-900">3. Visualiza los Resultados</h4>
                    <p className="mt-1 text-sm text-gray-500">Explora tus resultados, lee explicaciones sencillas y observa las tendencias.</p>
                </div>
            </div>
        </div>
    </div>
);

export default Welcome;