import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { formatScatterPlotData } from '../utils/formatChartData';

const ScatterPlot = ({ data }) => {
    const availableMetrics = [
        { label: 'MRR Score', value: 'mrr_score' },
        { label: 'Answer Relevancy', value: 'answer_relevancy' },
        { label: 'Faithfulness Score', value: 'faithfulness_score' },
        { label: 'Faithfulness Score 1', value: 'faithfulness_score_1' }
    ];

   
    const [xMetric, setXMetric] = useState('answer_relevancy');
    const [yMetric, setYMetric] = useState('faithfulness_score');
    const [scatterChartData, setScatterChartData] = useState(null);

   
    const toggleXMetric = () => {
        const currentIndex = availableMetrics.findIndex(metric => metric.value === xMetric);
        const nextIndex = (currentIndex + 1) % availableMetrics.length;
        setXMetric(availableMetrics[nextIndex].value);
    };

   
    const toggleYMetric = () => {
        const currentIndex = availableMetrics.findIndex(metric => metric.value === yMetric);
        const nextIndex = (currentIndex + 1) % availableMetrics.length;
        setYMetric(availableMetrics[nextIndex].value);
    };

    
    useEffect(() => {
        setScatterChartData(formatScatterPlotData(data, xMetric, yMetric));
    }, [data, xMetric, yMetric]);

    return (
        <div className="chart-container">
            {scatterChartData ? (
                <Scatter data={scatterChartData.data} options={scatterChartData.options(toggleXMetric, toggleYMetric)} />
            ) : (
                <p>Loading Scatter Plot...</p>
            )}
        </div>
    );
};

export default ScatterPlot;
