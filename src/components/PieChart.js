import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
    return (
        <div className="chart-container">
            <Pie data={chartData} options={chartData.options} />
        </div>
    );
};

export default PieChart;
