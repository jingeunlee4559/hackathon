import React from 'react';
import '../css/Community.css';

function Search({ onSubmit }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.elements.filter.value);
    };

    return (
        <div className="searchiv">
            <form onSubmit={handleSubmit} className="search">
                <input name="filter" className="search-input" placeholder="검색..." />
                <button className="search-button">Search</button>
            </form>
        </div>
    );
}

export default Search;
