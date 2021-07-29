import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShareIcon from '@material-ui/icons/Share';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Notification from './notification';

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
    pos: {
        marginBottom: 12,
    },
    card_button: {
        color: '#2196f3'
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
    content_button: {
        fontSize: 12
    }
});

const BoardItem = ({data}) => {
    const [readMore, setReadMore] = useState(false);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const date = moment(data.date).format("Do MMM yyyy");

    // Handle share button
    const handleShare = () => {
        const url = window.location.href + data._id;
        navigator.clipboard.writeText(url);
        handleOpen();
    };

    // Handle open notification
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography className={classes.pos} variant="h6" component="h2">
                            {data.name}
                        </Typography>
                        {data.description.length <= 50 ? 
                            <Typography className={classes.pos} variant="body2" component="p">
                                {data.description}
                            </Typography> : 
                            <Typography className={classes.pos} variant="body2" component="p">
                                {readMore ? data.description : `${data.description.substring(0, 50)}...`}
                                <Button onClick={() => setReadMore(!readMore)} color="primary" className={classes.content_button}>
                                    {readMore ? 'Show Less' : 'Read More'}
                                </Button>
                            </Typography> }
                        <Grid container>
                            <Grid item xs={8} sm={12} xl={8}>
                                <Typography className={classes.pos} color="textSecondary">
                                    {date}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sm={12} xl={4}>
                                <Typography className={classes.pos} color="textSecondary">
                                    Card: {data.cardNum}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <Divider/>
                <Grid container>
                    <Grid item xs={4} sm={12} xl={4}>
                        <ListItem >
                            <ListItemIcon><FiberManualRecordIcon className={classes.went_well_icon} /></ListItemIcon>
                            <ListItemText>{data.detail.WentWell.length}</ListItemText>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} sm={12} xl={4}>
                        <ListItem >
                            <ListItemIcon><FiberManualRecordIcon className={classes.to_improve_icon} /></ListItemIcon>
                            <ListItemText>{data.detail.ToImprove.length}</ListItemText>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} sm={12} xl={4}>
                        <ListItem >
                            <ListItemIcon><FiberManualRecordIcon className={classes.action_items_icon} /></ListItemIcon>
                            <ListItemText>{data.detail.ActionItems.length}</ListItemText>
                        </ListItem>
                    </Grid>
                </Grid>
                <Divider/>
                <CardActions>
                    <Grid container>
                        <Grid item xs={6}>
                            <Button size="small" fullWidth onClick={handleShare}>
                                <ShareIcon className={classes.card_button}></ShareIcon>
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to={`${data._id}`} >
                                <Button size="small" fullWidth>
                                    <ExitToAppIcon className={classes.card_button}></ExitToAppIcon>
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            <Notification data={{message: "Copied", type: 2}} open={open} handleClose={handleClose}/>
        </Grid>
    );
};

export default BoardItem;