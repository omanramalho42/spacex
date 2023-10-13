import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
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

        // Crie o novo gráfico
        const newChartInstance = new Chart(ctx, {
          type: 'pie', // Tipo de gráfico de pizza
          data: {
            labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
            datasets: [
              {
                data: [12, 19, 3, 5],
                backgroundColor: ['rgba(106, 49, 190, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 255, 0.6)'],
                borderColor: 'rgba(255, 255, 255, 1)', // Cor da borda
                borderWidth: 1,
              },
            ],
          },
          options: {
            // Opcionais: pode definir título, legendas, etc.
          },
        });

        // Atualize a referência para o novo gráfico
        // @ts-ignore
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

export default PieChart;
