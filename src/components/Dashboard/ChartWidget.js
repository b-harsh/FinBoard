'use client';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartWidget = ({ title, dataPoint, label }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: label,
        data: [],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    if (!dataPoint) return;

    const timestamp = new Date().toLocaleTimeString();

    setChartData((prev) => {
      const newLabels = [...prev.labels, timestamp].slice(-10);
      const newData = [...prev.datasets[0].data, dataPoint].slice(-10);

      return {
        labels: newLabels,
        datasets: [{ ...prev.datasets[0], data: newData }],
      };
    });
  }, [dataPoint]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#718096', maxTicksLimit: 5 },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#718096' },
        grid: { color: '#2d3748' },
      },
    },
    animation: { duration: 0 },
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '10px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartWidget;
