import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface DataProps {
  [key: string]: {
    success: number;
    errors: number;
    reused: number;
  }
}
interface PieChartProps {
  data: DataProps[];
}

const PieChart = ({ data }: PieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx && data) {
        // Destrua o gráfico anterior, se existir
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Crie o novo gráfico
        const newChartInstance = new Chart(ctx, {
          type: 'pie', // Tipo de gráfico de pizza
          data: {
            labels: Object.keys(data),
            datasets: [
              {
                label: 'Launchers',
                // @ts-ignore
                data: Object.keys(data).map(key => data[key]),
                backgroundColor: ['rgba(0, 0, 255, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)'],
                borderColor: 'rgba(255, 255, 255, 1)', // Cor da borda
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                text: 'Rocket Launchers',
                color: '#FFF',
                display: true
              },
              legend: {
                display: true,
                labels: {
                  color: '#FFF',
                },
                position: 'bottom', // Modifique a posição da legenda
              }
            },
          }
        });

        // Atualize a referência para o novo gráfico
        // @ts-ignore
        chartInstanceRef.current = newChartInstance;
      }
    }
  }, [data]);

  
  if(!data) {
    <Skeleton circle width={400} height={400} />
  }

  return (
    <div>
      <canvas 
        style={{ width: 400, height: 200 }} 
        ref={chartRef} id="meuGrafico" width="400" height="200"></canvas>
    </div>
  );
};

export default PieChart;
