import { Grid, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import boardApi from '../api/boardApi';
import BoardItem from './boardItem';
import Loading from './loading';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import BoardForm from './boardForm';

const BoardList = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boardList, setBoardList] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async (boardDetail) => {
        const newBoard = {
            name: boardDetail.name,
            ownerId: userId
        }

        try {
            const response = await boardApi.createNewBoard(newBoard);
            setBoardList(boardList.concat([response]));
        } catch(err) {
            console.log("Fail to add new board: ", err);
        }
    }
    
    useEffect(() => {
        const fetchBoardList = async () => {
            setIsLoading(true);

            try {
                const response = await boardApi.getByOwnerId(userId);
                setIsLoading(false);
                setBoardList(response);
            } catch(err) {
                setIsLoading(false);
                console.log('Fail to fetch list: ', err);
            }
        }

        fetchBoardList();
    }, []);

    if(isLoading) {
        return  (
            <Grid container alignItems='center' direction="column" justify="center">
                <Loading/>
            </Grid>
        );
    }

    return (
        <Grid>
            <Grid container direction="row">
                <Grid item xs={10} sm={11}>
                    <Typography variant="h3" gutterBottom>
                        My Boards
                    </Typography>
                </Grid>
                <Grid item xs={2} sm={1}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpen}>
                            <AddIcon/>
                    </Button>
                    <BoardForm open={open} handleClose={handleClose} handleAdd={handleAdd}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {
                    boardList.map((board) => 
                        <BoardItem key={board._id} data={board}/>)
                }
            </Grid>
        </Grid>
    );
};

export default BoardList;