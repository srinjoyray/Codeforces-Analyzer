import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        
    },
    menuButton: {
        // marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        // fontSize:12 rem
    },
    btn: {
        marginRight: 20,
        fontSize: 12,
        color: 'white',
    },
    navLink : {
        textDecoration : 'none',
    },
    active: {
        backgroundColor: 'red',
        textDecoration : 'none',
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Codeforces Analyzer
                    </Typography>
                    <Link exact to="/" className={classes.navLink}>
                        <Button color="inherit" className={classes.btn}>
                            <PersonIcon />
                            Single User
                        </Button>
                    </Link>
                    <Link exact to="/versus"  className={classes.navLink}> 
                        <Button color="inherit" className={classes.btn}>
                            <PeopleIcon />
                            Versus
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
