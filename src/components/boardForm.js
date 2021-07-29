import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const BoardForm = ({ open , handleClose, handleAdd }) => {
    const [boardDetail, setBoardDetail] = useState({name: ""});

    const onAdd = () => {
        handleAdd(boardDetail);
        onClose();
    };

    const onClose = () => {
        handleClose();
        setBoardDetail({name: ""});
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">Add New Board</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="name"
                    fullWidth
                    onChange={(e) => setBoardDetail({name: e.target.value})}
                    value={boardDetail.name}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onAdd} color="primary" variant="contained">
                    Add
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BoardForm;