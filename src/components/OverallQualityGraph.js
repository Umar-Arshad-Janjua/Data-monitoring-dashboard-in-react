import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatOverallChartData } from '../utils/formatChartData';


const OverallQualityGraph = ({ data }) => {
    const [overallChartData, setOverallChartData] = useState(null);

    
    useEffect(() => {
        const formattedData = formatOverallChartData(data);  
        setOverallChartData(formattedData);
    }, [data]);

    return (
        <div className="chart-container">
            {overallChartData ? (
                <Line data={overallChartData.data} options={overallChartData.options} />
            ) : (
                <p>Loading Overall Quality Graph...</p>
            )}
        </div>
    );
};

export default OverallQualityGraph;
