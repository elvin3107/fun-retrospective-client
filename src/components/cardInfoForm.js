import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CardInfoForm = ({ content, open , handleClose, handleUpdate }) => {
    const [cardDetail, setCardDetail] = useState({ content: ""});

    useEffect(() => {
        setCardDetail({content: content});
    },[content]);

    const onUpdate = () => {
        handleUpdate(cardDetail);
        handleClose();
    };

    const onClose = () => {
        handleClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">Update Card Content</DialogTitle>
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

export default CardInfoForm;