import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        // Destrua o gráfico anterior, se existir
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Crie o novo gráfico de barras
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
            datasets: [
              {
                label: 'Vendas',
                data: [12, 19, 3, 5],
                backgroundColor: 'rgba(106, 49, 190, 0.6)', // Cor roxa com transparência
                borderColor: 'rgba(106, 49, 190, 1)', // Cor roxa sem transparência
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        // Atualize a referência para o novo gráfico
        chartInstanceRef.current = newChartInstance;
      }
    }
  }, []);

  return (
    <div>
      <canvas style={{ width: 400, height: 200 }} ref={chartRef} id="meuGrafico" width="400" height="200"></canvas>
    </div>
  );
};

export default BarChart;
