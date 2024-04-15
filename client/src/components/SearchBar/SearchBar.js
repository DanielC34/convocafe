import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');

    const handleChange = (e) => {
        setSearchText(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchText)
    };

    return (
        <form className='search-bar' onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchText}
                onChange={handleChange}
                placeholder='Search name...'
            />
            <button type='submit'>Search</button>
        </form>
    );
}

export default SearchBar;