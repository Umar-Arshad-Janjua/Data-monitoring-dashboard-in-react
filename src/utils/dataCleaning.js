export const cleanData = (data) => {
    return data.map(row => {
        return {
            ...row,
            date: new Date(row.date), 
            answer_relevancy: parseFloat(row.answer_relevancy),
            faithfulness_score: parseFloat(row.faithfulness_score),
            faithfulness_score_1: parseFloat(row.faithfulness_score_1), 
            mrr_score: parseFloat(row.mrr_score),
            query: row.query ? row.query.trim() : '' 
        };
    }).filter(row => 
        !isNaN(row.answer_relevancy) &&
        !isNaN(row.faithfulness_score) &&
        !isNaN(row.faithfulness_score_1) && 
        !isNaN(row.mrr_score) &&
        row.query 
    );
};
