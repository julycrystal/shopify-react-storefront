import React, {useContext} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  element: {
    bar: {
      barWidth: 9,
    },
  },
  maintainAspectRation: true,
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: (value: number) => {
          return value % 2 === 0 ? value : null;
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const labels = [
  'Not Yet Started',
  'Reviewed',
  'In Progress',
  'Saved For Later',
];

export default function ProductStats() {
  const data = {
    labels,
    datasets: [
      {
        label: 'Products',
        backgroundColor: ['#008080', '#008080', '#008080', '#008080'],
        hoverBackgroundColor: '#325AE7',
        barPercentage: 0.1,
        categorySpacing: 2,
        data: [3, 4, 2, 6],
        borderWidth: 0,
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-right">Total 15 Products</h2>
      <div>
        <Bar height={130} options={options} data={data} />
      </div>
    </div>
  );
}
