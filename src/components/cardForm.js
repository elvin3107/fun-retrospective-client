import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CardForm = ({ open , handleClose, handleAdd, title }) => {
    const [cardDetail, setCardDetail] = useState({content: ""});

    const onAdd = () => {
        handleAdd(cardDetail);
        onClose();
    };

    const onClose = () => {
        handleClose();
        setCardDetail({content: ""});
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">Add New "{title}" Card</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Content"
                    fullWidth
                    onChange={(e) => setCardDetail({content: e.target.value})}
                    value={cardDetail.content}
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

export default CardForm;