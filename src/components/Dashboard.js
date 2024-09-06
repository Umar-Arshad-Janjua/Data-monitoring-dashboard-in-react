import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import '../styles/Dashboard.css';
import { cleanData } from '../utils/dataCleaning';
import { formatChartData, formatBarChartDataForSelectedQuery, formatPieChartData, formatDoughnutChartDataForSelectedQuery } from '../utils/formatChartData';
import LineGraph from './LineGraph';
import BarChart from './BarChart';
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
import ScatterPlot from './ScatterPlot';
import Suggestions from './Suggestions';
import OverallQualityGraph from './OverallQualityGraph';  

const Dashboard = ({ view }) => {  
    const [data, setData] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState('');
    const [chartData, setChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [doughnutChartData, setDoughnutChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/dataset.csv');
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    complete: (result) => {
                        const cleanedData = cleanData(result.data);
                        setData(cleanedData);
                        setSelectedQuery(cleanedData[0]?.query || '');
                    }
                });
            } catch (error) {
                console.error("Error fetching or parsing the CSV file:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedQuery && data.length > 0) {
            const filteredData = data.filter(row => row.query === selectedQuery);

            setChartData(formatChartData(filteredData, 'line'));
            setBarChartData(formatBarChartDataForSelectedQuery(filteredData));
            setDoughnutChartData(formatDoughnutChartDataForSelectedQuery(filteredData));

            const queryFrequency = calculateQueryFrequency(data);
            setPieChartData(formatPieChartData(queryFrequency, selectedQuery));
        }
    }, [selectedQuery, data]);

    const calculateQueryFrequency = (data) => {
        const queryFrequency = {};
        data.forEach(row => {
            const query = row.query;
            queryFrequency[query] = (queryFrequency[query] || 0) + 1;
        });
        return queryFrequency;
    };

   
    const getHeadingText = () => {
        if (view === 'overall') {
            return 'Quality over time for complete Dataset by Date';
        } else if (view === 'query') {
            return 'Specific Query Data Visualization';
        }
        return 'Search Quality Dashboard';
    };

    return (
        <div className="dashboard-container">
            <h1>{getHeadingText()}</h1>  
            
            {view === 'overall' ? (
                <div className="charts-row">
                    {data.length > 0 ? <OverallQualityGraph data={data} /> : <p>Loading data...</p>}
                </div>
            ) : (
                <div className="specific-query-container">
                    {data.length > 0 && (
                        <Suggestions 
                            data={data} 
                            selectedQuery={selectedQuery} 
                            setSelectedQuery={setSelectedQuery} 
                        />
                    )}
                    <div className="charts-row">
                        {chartData && <LineGraph chartData={chartData} />}
                    </div>
                    <div className="charts-row">
                       
                        {pieChartData && <PieChart chartData={pieChartData} />}
                        {doughnutChartData && <DoughnutChart chartData={doughnutChartData} />}
                        {barChartData && <BarChart chartData={barChartData} />}
                        {/* {data.length > 0 && <ScatterPlot data={data.filter(row => row.query === selectedQuery)} />} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
