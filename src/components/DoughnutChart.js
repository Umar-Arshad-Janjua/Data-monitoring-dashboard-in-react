import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <Doughnut data={chartData} options={chartData.options} />
        </div>
    );
};

export default DoughnutChart;
