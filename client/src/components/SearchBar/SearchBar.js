import React, { useState } from 'react'
import './SearchBar.css'
import axios from 'axios';
import Coffee from '../../pages/img/coffee1.png'
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import  DialogActions  from "@mui/material/DialogActions";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { isAuthenticated } from '../../auth';
import { createTheme, ThemeProvider } from '@mui/material';


const SearchBar = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleOpenDialog = async () => {
    try {
      const token = isAuthenticated(); //Retrieve token from localStorage
      if (!token) {
        throw new Error("No token found in local storage");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8000/api/users",
        config
      );
      setUsers(response.data);
      setDialogOpen(true);
    } catch (err) {
      console.error("Error fetching users: ", err);
    }
  }
  

      const handleCloseDialog = () => {
        setDialogOpen(false);
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
        <form onSubmit={(e) => e.preventDefault}>
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
              onClick={handleOpenDialog}
            >
              + New Chat
            </Button>
          </div>
        </form>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Select User</DialogTitle>
          <DialogContent>
            {users.length === 0 ? (
              <p>Loading users...</p>
            ) : (
              <List>
                {users.map((user) => (
                  <ListItem key={user._id} button>
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.profilePicture} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default SearchBar;