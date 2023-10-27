import React, { useEffect, useRef } from 'react';
import Chart, { Colors } from 'chart.js/auto';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

Chart.register(Colors);

interface DataProps {
  [key: string]: {
    success: number;
    errors: number;
    reused: number;
  }
}
interface BarChartProps {
  data: DataProps[];
}

const COLORS = ['rgba(0, 0, 255, 0.4)', 'rgba(255, 0, 0, 0.4)', 'rgb(0, 0, 0)', 'rgba(0, 255, 0, 0.4)']
const HOVER_COLORS = ['rgba(0, 0, 255, 0.9)', 'rgba(255, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 255, 0, 0.9)']

const BarChart = ({ data }: BarChartProps) => {
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
        // // Crie o novo gráfico de barras
        // @ts-ignore
        const rocketNames = [...new Set(Object.values(data).flatMap(item => Object.keys(item.rockets)))];
        const FILL: { [key: string]: { color: string; hoverColor: string } } = {};

        // Atribuir dinamicamente nomes de foguetes e cores
        rocketNames.forEach((rocketName, index) => {
          FILL[rocketName] = {
            color: COLORS[index],
            hoverColor: HOVER_COLORS[index],
          };
        });
      
        // @ts-ignore
        const xLabels = Object.keys(data).map(key => data[key].month);
        const datasets = rocketNames.map((rocketName) => {
          return {
            label: rocketName,
            // @ts-ignore
            data: Object.keys(data).map(key => data[key].rockets[rocketName] ? data[key].rockets[rocketName].value : 0),
            backgroundColor: FILL[rocketName].color,
            hoverBackgroundColor: FILL[rocketName].hoverColor,
            borderColor: FILL[rocketName].color,
            hoverBorderColor: FILL[rocketName].hoverColor,
            borderWidth: 1,
            hidden: false,
            fill: true,
            pointStyle: 'circle',
            z: '-1',
            // stack: rocketName,
            group: rocketName
          };
        });
        console.log(datasets,'datasets');
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(data),
            datasets: datasets,
            xLabels: xLabels,
          },
          options: {
            animation: {
              easing: 'easeInOutQuad', // Ajuste o modo de suavização da animação
              duration: 1500 // Ajuste a duração da animação em milissegundos
            },
            plugins: {
              title: {
                text: 'Launchers per year',
                color: '#FFF',
                display: true
              },
              colors: {
                enabled: true,
                forceOverride: false
              },
              legend: {
                labels: {
                  color: '#FFF',
                },
                position: 'bottom', // Modifique a posição da legenda
              },
            },
            scales: {
              x: {
                alignToPixels: true,
                display: 'auto',
                grid: {
                  offset: true,
                },
                ticks: {
                  color: '#FFF',
                },
                beginAtZero: true,
                stacked: true,
                axis: 'x',
                clip: true,
                reverse: false,
                labels: Object.keys(data),
              },
              y: {
                ticks: {
                  color: '#FFF',
                }
              }
            },
          },
        });

        // Atualize a referência para o novo gráfico
        chartInstanceRef.current = newChartInstance;
      }
    }
  }, []);

  if(!data) {
    return (
      <Skeleton width={400} height={200} />
    )
  }

  return (
    <div>
      <canvas 
        style={{ width: 400, height: 200 }} 
        ref={chartRef} 
        id="meuGrafico" 
        width="400" 
        height="200">

      </canvas>
    </div>
  );
};

export default BarChart;
