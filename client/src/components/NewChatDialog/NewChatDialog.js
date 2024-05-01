import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent } from "@material-ui/core";
import { DialogActions } from '@mui/material/DialogActions';
import { Button } from '@mui/material/Button';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const NewChatDialog = ({ open, onClose, users, onSelectUser }) => {

    
    return (
        <Dialog open={open} onClick={onClose}>
            <DialogTitle>Select a user to chat with</DialogTitle>
            <DialogContent>
                <List>
                    {users.map((user) => (
                        <ListItem button key={user.id} onClick={() => onSelectUser(user)}>
                            <ListItemText primary={user.name} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewChatDialog;