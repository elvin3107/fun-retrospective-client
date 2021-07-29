import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const BoardInfoForm = ({ name, description, open , handleClose, handleUpdate }) => {
    const [boardDetail, setBoardDetail] = useState({name: name, description: description});

    useEffect(() => {
        setBoardDetail({name: name, description: description});
    },[name, description]);

    const onUpdate = () => {
        handleUpdate(boardDetail);
        handleClose();
    };

    const onClose = () => {
        handleClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">Update Board Information</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    fullWidth
                    onChange={(e) => setBoardDetail({...boardDetail, name: e.target.value})}
                    value={boardDetail.name}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    fullWidth
                    onChange={(e) => setBoardDetail({...boardDetail, description: e.target.value})}
                    value={boardDetail.description}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onUpdate} color="primary" variant="contained">
                    Update
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BoardInfoForm;