import { Paper, Typography, Grid, Button, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import cardApi from '../api/cardApi';
import userApi from '../api/userApi';
import CardInfoForm from './cardInfoForm';
import CardDeleteConfirm from './cardDeleteConfirm';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    went_well_paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(3),
        },
        backgroundColor: '#009688',
        color: 'white'
    },
    to_improve_paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(3),
        },
        backgroundColor: '#e91e63',
        color: 'white'
    },
    action_items_paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(3),
        },
        backgroundColor: '#9c27b0',
        color: 'white'
    },
    went_well_process: {
        backgroundColor: '#009688'
    },
    to_improve_process: {
        backgroundColor: '#e91e63'
    },
    action_items_process: {
        backgroundColor: '#9c27b0'
    }
}));

const CardItem = ({ cardDetail, index, type, handleDeleteCard, handleUpdateItem }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [owner, setOwner] = useState({name: ""});
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const classes = useStyles();
    const itemTheme = [classes.went_well_paper, classes.to_improve_paper, classes.action_items_paper];
    const processColor = [classes.went_well_process, classes.to_improve_process, classes.action_items_process];

    // Handle update card dialog
    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    }

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }

    const handleUpdate = async (content) => {
        try{
            const response = await cardApi.updateCard(cardDetail._id, content);
            handleUpdateItem(cardDetail, response, type);
        } catch(err) {
            console.log("Fail to update card: ", err);
        }
    }

    // Handle delete card confirm
    const handleClickOpenDelete = () => {
        setOpenDeleteConfirm(true);
    }

    const handleCloseDelete = () => {
        setOpenDeleteConfirm(false);
    }

    const handleDelete = async () => {
        try{
            const response = await cardApi.deleteCard(cardDetail._id);
            handleDeleteCard(cardDetail, type);
        } catch(err) {
            console.log("Fail to update card: ", err);
        }
    }

    if(isLoading) {
        return <LinearProgress classes={{barColorPrimary: processColor[type]}}></LinearProgress>;
    }

    return (
        <Draggable key={cardDetail._id} draggableId={cardDetail._id} index={index}>
            {(provided) => (
                <Paper {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={itemTheme[type]}>
                    <Grid container direction="row">
                        <Grid item xs={10} xl={10}>
                            <Typography variant="h6" gutterBottom>
                                {cardDetail.content}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} xl={2}>
                            <Button onClick={handleClickOpenUpdate}>
                                <CreateIcon/>
                            </Button>
                            <CardInfoForm open={openUpdate} content={cardDetail.content}
                                    handleClose={handleCloseUpdate} handleUpdate={handleUpdate}/>
                            <Button color="primary" onClick={handleClickOpenDelete}>
                                <DeleteIcon />
                            </Button>
                            <CardDeleteConfirm open={openDeleteConfirm} 
                                    handleClose={handleCloseDelete} handleDelete={handleDelete}/>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Draggable>
    );
};

export default CardItem;