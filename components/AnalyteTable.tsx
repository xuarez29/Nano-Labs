import React from 'react';
import { Analyte, AnalyteStatus } from '../types';
import { AlertIcon, CheckCircleIcon, InfoIcon } from './icons';

interface AnalyteTableProps {
  analytes: Analyte[];
}

const getStatusStyles = (status: AnalyteStatus) => {
  switch (status) {
    case 'Alto':
      return {
        bgColor: 'bg-red-50',
        textColor: 'text-red-800',
        icon: <AlertIcon className="text-red-500" />,
      };
    case 'Bajo':
      return {
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-800',
        icon: <AlertIcon className="text-yellow-500" />,
      };
    case 'Límite':
      return {
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-800',
        icon: <AlertIcon className="text-orange-500" />,
      };
    case 'Normal':
    default:
      return {
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        icon: <CheckCircleIcon />,
      };
  }
};

const AnalyteTable: React.FC<AnalyteTableProps> = ({ analytes }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Analito</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rango de Referencia</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {analytes.map((analyte) => {
            const { bgColor, textColor, icon } = getStatusStyles(analyte.status);
            return (
              <tr key={analyte.name} className={`${bgColor}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{analyte.name}</div>
                      <div className="group relative flex items-center ml-2">
                          <InfoIcon />
                          <div className="absolute bottom-full mb-2 w-64 p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              {analyte.explanation}
                          </div>
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{analyte.value} {analyte.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{analyte.range} {analyte.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
                    <div className="flex items-center gap-1">
                      {icon}
                      {analyte.status}
                    </div>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyteTable;