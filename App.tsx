import React, { useState } from 'react';
import { LabReport, PatientData } from './types';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';
import { FullPageSpinner } from './components/Spinner';
import { analyzeLabReport } from './services/geminiService';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [report, setReport] = useState<LabReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File, patientData: PatientData) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const result = await analyzeLabReport(file, patientData);
      setReport(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 sticky top-24">
            <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            {isLoading && (
              <FullPageSpinner message="La IA está analizando tu informe..." />
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Ocurrió un error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {!isLoading && !report && !error && (
              <Welcome />
            )}
            
            {report && <ResultsDisplay report={report} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;