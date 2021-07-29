import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

const CardDeleteConfirm = ({ open, handleClose, handleDelete }) => {

    const onDelete = () => {
        handleDelete();
        handleClose();
    };

    const onClose = () => {
        handleClose();
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
            <DialogTitle id="form-dialog-title">Delete Card</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this card ?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDelete} color="secondary">
                    Delete
                </Button>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CardDeleteConfirm ;