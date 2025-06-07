// MatchBarChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MatchBarChart = () => {
  const data = {
    labels: ["Team A", "Team B", "Team C", "Team D"],
    datasets: [
      {
        label: "Goals Scored",
        data: [3, 1, 2, 4],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Goals",
        },
      },
    },
  };

  return (
    <div className="h-[250px] bg-white shadow-xl flex items-center justify-center p-5 border-2 border-gray-200 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MatchBarChart;
