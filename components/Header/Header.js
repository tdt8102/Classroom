import React from 'react'
import { useStyles } from './style'
import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import Apps from '@mui/icons-material/Apps';
import { CreateClass, JoinClass } from '..';
import { useLocalContext } from '../../context/context';


const Header = ({ children }) => {

    const classes = useStyles(); // Use the useStyles hook to get classes

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const {
        SetCreateClassDialog,
        setJoinClassDialog,
        loggedInUser,
        logout
    } = useLocalContext();

    const handleCreate = () => {
        handleClose()
        SetCreateClassDialog(true)
    }

    const handleJoin = () => {
        handleClose()
        setJoinClassDialog(true)
    }
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        <img
                            width="36px"
                            height="36px"
                            src="https://stf.hcmunre.edu.vn/Upload/images/brand-logo/HUNRE_Logo.png"//link hình logo google o day
                            alt="Classroom"
                        />
                        {<Typography variant="h6" className={classes.title}>
                            Hunre Classroom
                        </Typography>}
                    </div>
                    <div className={classes.header__wrapper__right}>
                        <AddIcon onClick={handleClick} className={classes.icon} />
                        <Apps className={classes.icon} />
                        <Menu
                            id='simple-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={(Boolean(anchorEl))}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleJoin}>Vào lớp học</MenuItem>
                            <MenuItem onClick={handleCreate}>Tạo lớp học</MenuItem>
                        </Menu>
                        <div>
                            <Avatar
                                onClick={() => logout()}
                                src={loggedInUser?.photoURL}
                                className={classes.icon} />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <CreateClass />
            <JoinClass />
        </div>
    );
};

export default Header;



