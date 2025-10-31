import React from 'react';
import { AlertIcon } from './icons';

const Disclaimer = () => (
  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
    <div className="flex">
      <div className="flex-shrink-0">
        <AlertIcon className="text-yellow-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700">
          <span className="font-bold">Aviso Legal:</span> Esta herramienta es solo para fines informativos y no sustituye el consejo, diagnóstico o tratamiento médico profesional. Siempre busca el consejo de tu médico u otro proveedor de salud calificado con cualquier pregunta que puedas tener sobre una condición médica. Nunca ignores el consejo médico profesional ni demores en buscarlo por algo que hayas leído en esta aplicación.
        </p>
      </div>
    </div>
  </div>
);

export default Disclaimer;