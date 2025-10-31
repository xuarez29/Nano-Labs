import React, { useState } from 'react';
import { LabReport } from '../types';
import AnalyteTable from './AnalyteTable';
import TrendChart from './TrendChart';
import Disclaimer from './Disclaimer';
import { ChartIcon, DocumentTextIcon, StethoscopeIcon } from './icons';

interface ResultsDisplayProps {
  report: LabReport;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'trends' | 'doctor'>('details');

  const getTabClass = (tabName: typeof activeTab) => {
    return `flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
      activeTab === tabName
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  };

  return (
    <div className="space-y-8">
      {/* Patient Summary / Key Takeaways */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Conclusiones Clave para Ti</h3>
        <p className="text-sm text-gray-500 mb-4">Un resumen sencillo de tu informe de laboratorio. Por favor, discute los resultados completos con tu médico.</p>
        <div className="p-4 bg-blue-50 rounded-lg">
            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap">
                {report.patientSummary}
            </div>
            {report.specialistRecommendation && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="text-md font-semibold text-gray-800 flex items-center">
                  <StethoscopeIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Profesional Recomendado
                </h4>
                <p className="mt-1 text-sm text-gray-700">
                  {report.specialistRecommendation}
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Tabs for detailed info */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
            <nav className="p-2 flex space-x-2" aria-label="Tabs">
                <button onClick={() => setActiveTab('details')} className={getTabClass('details')}>
                    <DocumentTextIcon className="h-5 w-5" />
                    <span className="ml-2">Resultados Detallados</span>
                </button>
                <button onClick={() => setActiveTab('trends')} className={getTabClass('trends')}>
                    <ChartIcon className="h-5 w-5" />
                    <span className="ml-2">Tendencias Históricas</span>
                </button>
                <button onClick={() => setActiveTab('doctor')} className={getTabClass('doctor')}>
                    <StethoscopeIcon className="h-5 w-5" />
                    <span className="ml-2">Resumen para el Médico</span>
                </button>
            </nav>
        </div>

        <div className="p-6">
            {activeTab === 'details' && <AnalyteTable analytes={report.analytes} />}
            {activeTab === 'trends' && <TrendChart analytes={report.analytes} />}
            {activeTab === 'doctor' && (
                <div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-4">Resumen Técnico para Médicos</h3>
                     <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                        {report.doctorSummary}
                    </div>
                </div>
            )}
        </div>
      </div>

      <Disclaimer />
    </div>
  );
};

export default ResultsDisplay;