import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import '../styles/Dashboard.css';
const Suggestions = ({ data, selectedQuery, setSelectedQuery }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : Array.from(new Set(data.map(row => row.query)))
            .filter(query =>
                query.toLowerCase().includes(inputValue)
            );
    };

    const getSuggestionValue = suggestion => suggestion;

    const renderSuggestion = suggestion => (
        <div className="suggestion-item">
            {suggestion}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        setSelectedQuery(suggestion);
        setIsModalOpen(false);
    };

    const handleDropdownChange = (query) => {
        setValue(query);
        setSelectedQuery(query);
        setIsModalOpen(false);
    };

    return (
        <div className="search-container">
            <div className="query-selection">
                <p className="selected-query-text">Selected query:</p>
                <button className="query-button" onClick={() => setIsModalOpen(true)}>
                    {selectedQuery || 'Select Query'}
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={{
                                placeholder: 'Search or select query...',
                                value,
                                onChange: onChange
                            }}
                            onSuggestionSelected={onSuggestionSelected}
                        />
                        <div className="query-list">
                            {Array.from(new Set(data.map(row => row.query))).map(query => (
                                <div 
                                    key={query} 
                                    className="query-item" 
                                    onClick={() => handleDropdownChange(query)}
                                >
                                    {query}
                                </div>
                            ))}
                        </div>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Suggestions;
