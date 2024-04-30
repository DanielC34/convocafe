import React, { useState } from 'react'
import './SearchBar.css'
import Coffee from '../../pages/img/coffee1.png'
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from '@mui/material';


const SearchBar = ({ onSearch }) => {

    const [searchText, setSearchText] = useState('');

    const handleChange = (e) => {
        setSearchText(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchText)
    };

    const theme = createTheme({
      palette: {
        primary: {
          main: "#000000",
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Coffee}
                alt="Coffee"
                style={{ width: "40px", marginRight: "50px" }}
              />
              <Button
                variant="contained"
                color="primary" 
                type="submit"
                size="small"
                sx={{ marginLeft: "auto" }}
              >
                + New Chat
              </Button>
            </div>
          </form>
        </div>
      </ThemeProvider>
    );
}

export default SearchBar;