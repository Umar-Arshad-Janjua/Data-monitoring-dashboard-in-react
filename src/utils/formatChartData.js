export const formatChartData = (data, chartType = 'line') => {
    const dates = data.map(row => {
        const date = new Date(row.date);
        return date.toLocaleString("en-GB", { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'UTC'  
        });
    });

    const mrrScores = data.map(row => row.mrr_score);
    const answerRelevancy = data.map(row => row.answer_relevancy);
    const faithfulnessScores = data.map(row => row.faithfulness_score);
    const faithfulnessScores1 = data.map(row => row.faithfulness_score_1);

    const datasets = [
        {
            label: 'MRR Score',
            data: mrrScores,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: chartType === 'bar' ? 'rgba(75, 192, 192, 0.2)' : 'rgb(75, 192, 192)',
            tension: chartType === 'line' ? 0.1 : 0,
            type: chartType
        },
        {
            label: 'Answer Relevancy',
            data: answerRelevancy,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: chartType === 'bar' ? 'rgba(255, 99, 132, 0.2)' : 'rgb(255, 99, 132)',
            tension: chartType === 'line' ? 0.1 : 0,
            type: chartType
        },
        {
            label: 'Faithfulness Score',
            data: faithfulnessScores,
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: chartType === 'bar' ? 'rgba(54, 162, 235, 0.2)' : 'rgb(54, 162, 235)',
            tension: chartType === 'line' ? 0.1 : 0,
            type: chartType
        },
        {
            label: 'Faithfulness Score 1',
            data: faithfulnessScores1,
            fill: false,
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: chartType === 'bar' ? 'rgba(153, 102, 255, 0.2)' : 'rgb(153, 102, 255)',
            tension: chartType === 'line' ? 0.1 : 0,
            type: chartType
        }
    ];

    return {
        labels: dates,
        datasets: datasets,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Line Graph for Quality over Time of selected Query',
                    font: {
                        size: 18,
                     
                    },
                    color: '#ffffff',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff' 
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff',  
                    },
                    grid: {
                        color: '#444'  
                    },
                    title: {
                        display: true,
                        text: 'Time',
                        font: {
                            size: 14,
                            
                        },
                        color: '#ffffff' 
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff',  
                    },
                    grid: {
                        color: '#444'  
                    },
                    title: {
                        display: true,
                        text: 'Scores',
                        font: {
                            size: 14,
                            
                        },
                        color: '#ffffff'  
                    }
                }
            }
        }
    };
};


export const formatBarChartDataForSelectedQuery = (data) => {
    const total = {
        mrr: 0,
        answerRelevancy: 0,
        faithfulnessScore: 0,
        faithfulnessScore1: 0,
        count: data.length
    };

    data.forEach(row => {
        total.mrr += parseFloat(row.mrr_score) || 0;
        total.answerRelevancy += parseFloat(row.answer_relevancy) || 0;
        total.faithfulnessScore += parseFloat(row.faithfulness_score) || 0;
        total.faithfulnessScore1 += parseFloat(row.faithfulness_score_1) || 0;
    });

    const averages = {
        mrr: total.mrr / total.count,
        answerRelevancy: total.answerRelevancy / total.count,
        faithfulnessScore: total.faithfulnessScore / total.count,
        faithfulnessScore1: total.faithfulnessScore1 / total.count,
    };

    return {
        labels: ['MRR Score', 'Answer Relevancy', 'Faithfulness Score', 'Faithfulness Score 1'],
        datasets: [
            {
                label: 'Average Metrics for Selected Query',
                data: [averages.mrr, averages.answerRelevancy, averages.faithfulnessScore, averages.faithfulnessScore1],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }
        ],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Bar Chart for Average of selected Query Metrics',
                    font: {
                        size: 18,
                       
                    },
                    color: '#ffffff',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff' 
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff' 
                    },
                    grid: {
                        color: '#444'  
                    }
                },
                x: {
                    ticks: {
                        color: '#ffffff'  
                    },
                    grid: {
                        color: '#444'  
                    }
                }
            }
        }
    };
};

export const formatPieChartData = (queryFrequency, selectedQuery) => {
    const labels = Object.keys(queryFrequency);
    const data = Object.values(queryFrequency);

 
    const selectedQueryCount = queryFrequency[selectedQuery] || 0;

    const backgroundColors = labels.map(label => 
        label === selectedQuery ? 'rgba(75, 192, 192, 1)' : 'rgba(192, 192, 192, 0.5)'
    );

    const borderColors = labels.map(label =>
        label === selectedQuery ? 'rgba(75, 192, 192, 1)' : 'rgba(192, 192, 192, 0.2)'
    );

    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Pie chart for Frequency of Selected Query: (${selectedQueryCount} searches)`,  
                    font: {
                        size: 18
                    },
                    color: '#ffffff', 
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                legend: {
                    display: false 
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const query = tooltipItem.label;
                            const count = tooltipItem.raw;
                            return `${query}: ${count} searches`;
                        }
                    }
                }
            }
        }
    };
};




export const formatDoughnutChartDataForSelectedQuery = (data) => {
    if (data.length === 0) return null;

    let totalMrr = 0;
    let totalAnswerRelevancy = 0;
    let totalFaithfulnessScore = 0;
    let totalFaithfulnessScore1 = 0;
    const count = data.length;

    data.forEach(row => {
        totalMrr += parseFloat(row.mrr_score) || 0;
        totalAnswerRelevancy += parseFloat(row.answer_relevancy) || 0;
        totalFaithfulnessScore += parseFloat(row.faithfulness_score) || 0;
        totalFaithfulnessScore1 += parseFloat(row.faithfulness_score_1) || 0;
    });

 
    const averages = {
        'MRR Score': totalMrr / count,
        'Answer Relevancy': totalAnswerRelevancy / count,
        'Faithfulness Score': totalFaithfulnessScore / count,
        'Faithfulness Score 1': totalFaithfulnessScore1 / count,
    };

    const labels = Object.keys(averages);
    const values = Object.values(averages);

   
    const backgroundColors = [
        'rgba(75, 192, 192, 0.2)', 
        'rgba(255, 99, 132, 0.2)', 
        'rgba(54, 162, 235, 0.2)', 
        'rgba(153, 102, 255, 0.2)'
    ];
    const borderColors = [
        'rgba(75, 192, 192, 1)', 
        'rgba(255, 99, 132, 1)', 
        'rgba(54, 162, 235, 1)', 
        'rgba(153, 102, 255, 1)'
    ];

    return {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Metrics Distribution for Selected Query',
                    font: {
                        size: 18,
                       
                    },
                    color: '#ffffff',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                legend: {
                    labels: {
                        color: '#ffffff' 
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const metric = tooltipItem.label;
                            const value = tooltipItem.raw.toFixed(2);
                            return `${metric}: ${value}`;
                        }
                    }
                }
            }
        }
    };
};


export const formatScatterPlotData = (data, xMetric, yMetric) => {
    if (data.length === 0 || !xMetric || !yMetric) return null;

    const scatterData = data.map(row => ({
        x: parseFloat(row[xMetric]) || 0,
        y: parseFloat(row[yMetric]) || 0
    }));

    return {
        data: {
            datasets: [
                {
                    label: `${xMetric.replace('_', ' ')} vs ${yMetric.replace('_', ' ')}`,
                    data: scatterData,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                }
            ]
        },
        options: (toggleXMetric, toggleYMetric) => ({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: xMetric.replace('_', ' '),
                        color: '#ffffff' 
                    },
                    ticks: {
                        color: '#ffffff' 
                    },
                    grid: {
                        color: '#444'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yMetric.replace('_', ' '),
                        color: '#ffffff' 
                    },
                    ticks: {
                        color: '#ffffff' 
                    },
                    grid: {
                        color: '#444' 
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'  
                    }
                },
                title: {
                    display: true,
                    text: 'Distribution of Metrics for Selected Query',
                    font: {
                        size: 18,
                        color: '#ffffff'  
                    },
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        })
    };
};


export const formatOverallChartData = (data) => {
    if (!data || data.length === 0) return null;

   
    const aggregatedData = {};

    data.forEach(row => {
        const date = new Date(row.date).toLocaleDateString(); 
        if (!aggregatedData[date]) {
            aggregatedData[date] = { 
                mrr_score: 0, 
                answer_relevancy: 0, 
                faithfulness_score: 0, 
                faithfulness_score_1: 0, 
                count: 0 
            };
        }

       
        aggregatedData[date].mrr_score += parseFloat(row.mrr_score) || 0;
        aggregatedData[date].answer_relevancy += parseFloat(row.answer_relevancy) || 0;
        aggregatedData[date].faithfulness_score += parseFloat(row.faithfulness_score) || 0;
        aggregatedData[date].faithfulness_score_1 += parseFloat(row.faithfulness_score_1) || 0;
        aggregatedData[date].count += 1;
    });

  
    const labels = [];
    const mrrScores = [];
    const answerRelevancy = [];
    const faithfulnessScores = [];
    const faithfulnessScores1 = [];

    
    const sortedData = Object.entries(aggregatedData).sort((a, b) => new Date(a[0]) - new Date(b[0]));

    sortedData.forEach(([date, entry]) => {
        labels.push(date);
        mrrScores.push(entry.mrr_score / entry.count);
        answerRelevancy.push(entry.answer_relevancy / entry.count);
        faithfulnessScores.push(entry.faithfulness_score / entry.count);
        faithfulnessScores1.push(entry.faithfulness_score_1 / entry.count);
    });

    return {
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'MRR Score',
                    data: mrrScores,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    hidden: false  
                },
                {
                    label: 'Answer Relevancy',
                    data: answerRelevancy,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    hidden: false  
                },
                {
                    label: 'Faithfulness Score',
                    data: faithfulnessScores,
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.4,
                    hidden: false 
                },
                {
                    label: 'Faithfulness Score 1',
                    data: faithfulnessScores1,
                    fill: false,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    tension: 0.4,
                    hidden: false 
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                
                legend: {
                    labels: {
                        color: '#ffffff' 
                    }
                },
                title: {
                    display: true,
                    text: 'Line Graph for Overall Quality Metrics Averaged by Date',
                    font: {
                        size: 18,
                       
                    },
                    color: '#ffffff',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                        color: '#ffffff'  
                    },
                    
                    ticks: {
                        color: '#ffffff'  
                    },
                    grid: {
                        color: '#444'  
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quality Metrics',
                        color: '#ffffff'  
                    },
                    ticks: {
                        color: '#ffffff'  
                    },
                    grid: {
                        color: '#444' 
                    }
                }
            }
        }
    };
};


