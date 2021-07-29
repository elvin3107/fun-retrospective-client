import { AppBar, Button, Toolbar, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState, useRef } from 'react';
import Logo from '../resource/img/logo.png';

const useStyle = makeStyles((theme) => ({
    bottom_space: {
        marginBottom: 12, 
    },
    title: {
        flexGrow: 1,
    },
    logoutButton: {
        marginLeft: 10,
    },
    link: {
        textDecoration: 'none',
        flexGrow: 1,
    },
    linkProfile: {
        textDecoration: 'none',
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
}));

const Header = ({ user, action, url }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyle();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    return (
        <AppBar position="static" className={classes.bottom_space}>
            <Toolbar>
                <Link to={`/`} className={classes.link}>
                    <Avatar className={classes.large} src={Logo} alt="Retro Clone"></Avatar>
                </Link>
                <div>
                    <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                        <AccountCircleIcon fontSize="large"/>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <Link to='/profile' className={classes.linkProfile}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>
                                <MenuItem onClick={action}>Logout</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;