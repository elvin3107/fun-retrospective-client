import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CardItem from './cardItem';
import CardForm from './cardForm';
import cardApi from '../api/cardApi';
import { Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(3),
        },
    },
    went_well_icon: {
        color: '#009688'
    },
    to_improve_icon: {
        color: '#e91e63'
    },
    action_items_icon: {
        color: '#9c27b0'
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

const CardList = ({ userId, type, cardList, handleAdd, handleDelete, handleUpdate }) => {
    const [openAddCard, setOpenAddCard] = useState(false);
    const classes = useStyles();
    const columnTheme = [classes.went_well_icon, classes.to_improve_icon, classes.action_items_icon];
    const columnTitle = ["Went Well", "To Improve", "Action Items"];
    const processColor = [classes.went_well_process, classes.to_improve_process, classes.action_items_process];

    // Handle add new card dialog
    const handleAddOpen = () => {
        setOpenAddCard(true);
    }

    const handleAddClose = () => {
        setOpenAddCard(false);
    }

    const handleAddCard = async ({ content }) => {
        try{
            const response = await cardApi.createCard({
                ownerId: userId,
                content: content
            });
            handleAdd(response, type);
        } catch(err) {
            console.log('Fail to add new card: ', err);
        }
    }

    return (
        <Grid item xs={12} md={4}>
            <Typography className={columnTheme[type]} variant="h4" align="center">
                <FiberManualRecordIcon/>
                {`  ${columnTitle[type]}`}
            </Typography>
            <Paper elevation={3} className={classes.paper}>
                <Button onClick={handleAddOpen} fullWidth variant="contained">
                    <AddIcon/>
                </Button>
                <CardForm open={openAddCard} handleClose={handleAddClose} handleAdd={handleAddCard} title={columnTitle[type]}/>
                    <Droppable container droppableId={`${type}`}>
                        {(provided) => (
                            <Grid {...provided.droppableProps} ref={provided.innerRef}>
                            {
                                cardList.map((card, index) => 
                                    <CardItem key={card._id} index={index} cardDetail={card} type={type} handleDeleteCard={handleDelete} handleUpdateItem={handleUpdate}/>
                                )
                            }
                            {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
            </Paper>
        </Grid>
    );
};

export default CardList;