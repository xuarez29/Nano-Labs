import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Analyte, ChartData } from '../types';

// Fix: Define the TrendChartProps interface
interface TrendChartProps {
  analytes: Analyte[];
}

// Helper to generate mock historical data for demonstration
const generateMockData = (currentAnalyte: Analyte): ChartData => {
  const currentValue = parseFloat(currentAnalyte.value);
  if (isNaN(currentValue)) return [];

  const data: ChartData = [];
  const date = new Date();
  
  for (let i = 3; i >= 0; i--) {
    date.setMonth(new Date().getMonth() - i * 3);
    const fluctuation = (Math.random() - 0.5) * (currentValue * 0.1); // +/- 5%
    let value = currentValue + fluctuation * (4-i); // Fluctuation decreases closer to present
    if (i === 0) value = currentValue; // Ensure last point is the current value

    data.push({
      date: date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }),
      [currentAnalyte.name]: parseFloat(value.toFixed(2)),
    });
  }
  return data;
};


const TrendChart: React.FC<TrendChartProps> = ({ analytes }) => {
  const keyAnalytesForCharting = ['Glucose', 'Cholesterol, Total', 'LDL', 'HDL', 'Triglycerides', 'Hemoglobin A1c', 'Glucosa', 'Colesterol Total'];
  const chartableAnalytes = analytes.filter(a => keyAnalytesForCharting.some(key => a.name.toLowerCase().includes(key.toLowerCase())) && !isNaN(parseFloat(a.value)));
  
  if (chartableAnalytes.length === 0) {
    return (
        <div className="text-center py-8">
            <h4 className="text-lg font-medium text-gray-700">No hay Datos Graficables</h4>
            <p className="text-sm text-gray-500 mt-2">Las tendencias históricas se pueden mostrar para analitos clave como Glucosa, Colesterol, etc. No se encontraron en este informe.</p>
        </div>
    );
  }

  const chartData = generateMockData(chartableAnalytes[0]);
  const analyteName = chartableAnalytes[0].name;

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Este gráfico muestra una tendencia simulada para <span className="font-bold">{analyteName}</span> durante el último año. Para tendencias reales, sube múltiples informes a lo largo del tiempo.
      </p>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: chartableAnalytes[0].unit, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={analyteName} stroke="#3b82f6" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;