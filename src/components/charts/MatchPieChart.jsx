// MatchPieChart.jsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register pie chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const MatchPieChart = () => {
  const data = {
    labels: ["Team A", "Team B", "Team C", "Team D"],
    datasets: [
      {
        label: "Win Percentage",
        data: [30, 25, 20, 25],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Important for fixed height
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${value}% wins`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[250px] bg-white shadow-xl flex items-center justify-center border-2 border-gray-200 p-4 rounded-lg">
      <Pie data={data} options={options} />
    </div>
  );
};

export default MatchPieChart;
