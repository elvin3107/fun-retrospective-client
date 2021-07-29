import { Grid, TextField, Typography, Button, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import boardApi from '../api/boardApi';
import cardApi from '../api/cardApi';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import CardList from './cardList';
import BoardInfoForm from './boardInfoForm';
import BoardDeleteConfirm from './boardDeleteConfirm';
import Loading from './loading';
import { DragDropContext } from 'react-beautiful-dnd';
import io from 'socket.io-client';
const ENDPOINT = 'https://api-funretro-v1.herokuapp.com';
// let socket;

const socket = io(ENDPOINT);

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(0),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(3),
        },
    },
}));

const BoardDetail = ({ userId }) => {
    let { boardId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [boardDetail, setBoardDetail] = useState({
        name: "",
        description: "",
        cardNum: "",
    });
    const [WWCardList, setWWCardList] = useState([]);
    const [TICardList, setTICardList] = useState([]);
    const [AICardList, setAICardList] = useState([]);
    const [openUpdateInfo, setOpenUpdateInfo] = useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const classes = useStyles();

    // Handle edit board information dialog
    const handleUpdateOpen = () => {
        setOpenUpdateInfo(true);
    }

    const handleUpdateClose = () => {
        setOpenUpdateInfo(false);
    }

    const handleUpdateInfo = async ({ name, description }) => {
        try {
            const response = await boardApi.updateBoard(boardId, {
                name: name,
                description: description
            });
            boardDataToServer(response.name, response.description);
            setBoardDetail({
                ...boardDetail,
                name: response.name,
                description: response.description
            });
        } catch(err) {
            console.log("Fail to update board: ", err);
        }
    }

    // Handle delete board confirm dialog
    const handleDeleteConfirmOpen = () => {
        setOpenDeleteConfirm(true);
    }

    const handleDeleteConfirmClose = () => {
        setOpenDeleteConfirm(false);
    }

    const handleDeleteBoard = async () => {
        try {
            const response = await boardApi.deleteBoard(boardId);
            setRedirect(true);
        } catch(err) {
            console.log("Fail to delete board: ", err);
        }
    }

    // Handle add new card
    const handleAddNewCardToColumn = async (card, type) => {
        let newList;
        let data;
        switch(type) {
            case 0:
                WWCardList.push(card);
                data = {
                    cardNum: boardDetail.cardNum + 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
            case 1:
                TICardList.push(card);
                data = {
                    cardNum: boardDetail.cardNum + 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
            case 2:
                AICardList.push(card);
                data = {
                    cardNum: boardDetail.cardNum + 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
        }

        cardDataToServer();
        try {
            const response = await boardApi.updateBoard(boardId, data);
            setBoardDetail({
                name: response.name,
                description: response.description,
                cardNum: response.cardNum,
            });
            setWWCardList(WWCardList);
            setTICardList(TICardList);
            setAICardList(AICardList); 
        } catch(err) {
            console.log("Fail to add new card to board detail: ", err);
        }
    }

    // Handle delete card
    const handleDeleteCard = async (card, type) => {
        let index;
        let data;
        switch(type) {
            case 0:
                index = WWCardList.indexOf(card);
                WWCardList.splice(index, 1);
                data = {
                    cardNum: boardDetail.cardNum - 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
            case 1:
                index = TICardList.indexOf(card);
                TICardList.splice(index, 1);
                data = {
                    cardNum: boardDetail.cardNum - 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
            case 2:
                index = AICardList.indexOf(card);
                AICardList.splice(index, 1);
                data = {
                    cardNum: boardDetail.cardNum - 1,
                    detail: {
                        WentWell: WWCardList.map(card => card._id),
                        ToImprove: TICardList.map(card => card._id),
                        ActionItems: AICardList.map(card => card._id)
                    }
                }
                break;
        }

        cardDataToServer(); 
        try {
            const response = await boardApi.updateBoard(boardId, data);
            setBoardDetail({
                name: response.name,
                description: response.description,
                cardNum: response.cardNum,
            });
            setWWCardList(WWCardList);
            setTICardList(TICardList);
            setAICardList(AICardList); 
        } catch(err) {
            console.log("Fail to delete card id from board: ", err);
        }
    }

     // Handle update card item
     const handleUpdateCardItem = (oldData, newData, type) => {
        switch(type) {
            case 0:
                WWCardList[WWCardList.indexOf(oldData)] = newData;
                setWWCardList(WWCardList.slice());
                break;
            case 1:
                TICardList[TICardList.indexOf(oldData)] = newData;
                setTICardList(TICardList.slice());
                break;
            case 2:
                AICardList[AICardList.indexOf(oldData)] = newData;
                setAICardList(AICardList.slice());
                break;
        }
        cardDataToServer();
    }

     // Handle drag card end
    const handleOnDragEnd = async (result) => {
        if(!result.destination) return;
        const {source, destination, draggableId} = result;
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;
        let currentItem;
        
        if(source.droppableId === destination.droppableId) {
            switch(source.droppableId) {
                case "0":
                    currentItem = WWCardList.splice(source.index, 1)[0];
                    WWCardList.splice(destination.index, 0, currentItem);
                    break;
                case "1":
                    currentItem = TICardList.splice(source.index, 1)[0];
                    TICardList.splice(destination.index, 0, currentItem);
                    break;
                case "2":
                    currentItem = AICardList.splice(source.index, 1)[0];
                    AICardList.splice(destination.index, 0, currentItem);
                    break;
            }
        } else {
            switch(source.droppableId) {
                case "0":
                    currentItem = WWCardList.splice(source.index, 1)[0];
                    break;
                case "1":
                    currentItem = TICardList.splice(source.index, 1)[0];
                    break;
                case "2":
                    currentItem = AICardList.splice(source.index, 1)[0];
                    break;
            }
            

            switch(destination.droppableId) {
                case "0":
                    WWCardList.splice(destination.index, 0, currentItem);
                    break;
                case "1":
                    TICardList.splice(destination.index, 0, currentItem);
                    break;
                case "2":
                    AICardList.splice(destination.index, 0, currentItem);
                    break;
            }
        }

        cardDataToServer();
        try {
            const response = await boardApi.updateBoard(boardId, {
                detail: {
                    WentWell: WWCardList.map(card => card._id),
                    ToImprove: TICardList.map(card => card._id),
                    ActionItems: AICardList.map(card => card._id)
                }
            });
            setWWCardList(WWCardList);
            setTICardList(TICardList);
            setAICardList(AICardList); 
        } catch(err) {
            console.log("Fail to update dnd card: ", err);
        } 
    }


    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await boardApi.getById(boardId);
                setBoardDetail({
                    name: response.name,
                    description: response.description,
                    cardNum: response.cardNum,
                });
                fetchCardList(response.detail.WentWell, 0);
                fetchCardList(response.detail.ToImprove, 1);
                fetchCardList(response.detail.ActionItems, 2);
            } catch(err) {
                console.log("Fail to fetch a board: ", err);
            }
        };

        const fetchCardList = async (cardIdList, type) => {
            try {
                const response = await cardApi.getCardList(cardIdList);
                switch(type) {
                    case 0:
                        setWWCardList(response);
                        break;
                    case 1:
                        setTICardList(response);
                        break;
                    case 2:
                        setAICardList(response);
                        setIsLoading(false);
                        break;
                }
            } catch(err) {
                console.log("Fail to fetch card list: ", err);
            }
        }

        socket.emit('join', { boardId });

        fetchBoard();
    }, []);

    // Socket IO
    useEffect(() => {
        socket.on('cardDataFromServer', ({ data }) => {
            setBoardDetail({...boardDetail, cardNum: data.cardNum});
            setWWCardList(data.detail.WWCardList);
            setTICardList(data.detail.TICardList);
            setAICardList(data.detail.AICardList);
        });

        socket.on('boardDataFromServer', ({ data }) => {
            setBoardDetail({
                ...boardDetail, 
                name: data.name,
                description: data.description
            })
        })
    }, [WWCardList, TICardList, AICardList, boardDetail]);

    const cardDataToServer = () => {
        socket.emit('changeCardData', { 
            boardId: boardId, 
            data: {
                cardNum: boardDetail.cardNum,
                detail: {
                    WWCardList: WWCardList,
                    TICardList: TICardList,
                    AICardList: AICardList,
                }
            }
        });
    }

    const boardDataToServer = (name, description) => {
        socket.emit('changeBoardData', { 
            boardId: boardId, 
            data: {
                name: name,
                description: description
            }
        });
    }

    if(isLoading) {
        return  (
            <Grid container alignItems='center' direction="column" justify="center">
                <Loading/>
            </Grid>
        );
    }

    return (
        <div>
        {redirect === true ? (<Redirect to="/"/>) : 
        (<Grid container direction="row" justify="center">
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container >
                        <Grid item xs={12} md={11}>
                            <Typography variant="h5" gutterBottom>
                                {boardDetail.name}
                            </Typography>
                            <Typography variant="body1">
                                {boardDetail.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <Button onClick={handleUpdateOpen}>
                                <CreateIcon/>
                            </Button>
                            <BoardInfoForm name={boardDetail.name} description={boardDetail.description} open={openUpdateInfo}
                                     handleClose={handleUpdateClose} handleUpdate={handleUpdateInfo} />
                            <Button color="secondary" onClick={handleDeleteConfirmOpen}>
                                <DeleteIcon/>
                            </Button>
                            <BoardDeleteConfirm name={boardDetail.name} open={openDeleteConfirm}
                                    handleClose={handleDeleteConfirmClose} handleDelete={handleDeleteBoard} />
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={2}>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <CardList type={0} cardList={WWCardList} userId={userId} handleAdd={handleAddNewCardToColumn} handleDelete={handleDeleteCard} handleUpdate={handleUpdateCardItem}/>
                        <CardList type={1} cardList={TICardList} userId={userId} handleAdd={handleAddNewCardToColumn} handleDelete={handleDeleteCard} handleUpdate={handleUpdateCardItem}/>
                        <CardList type={2} cardList={AICardList} userId={userId} handleAdd={handleAddNewCardToColumn} handleDelete={handleDeleteCard} handleUpdate={handleUpdateCardItem}/>
                    </DragDropContext>
                </Grid>
            </Grid>
        </Grid>)}
        </div>
    )
}

export default BoardDetail;
