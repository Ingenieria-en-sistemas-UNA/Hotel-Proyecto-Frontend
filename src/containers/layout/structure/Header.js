import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, withStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { withContext } from '../../../store/Context'
import classNames from 'classnames';
import styles from './jss/Header'

class Header extends Component {

    onClickLogin = () => () => {
        const { history } = this.props
        history.push('/login')
    }
    onClickSignup = () => () => {
        const { history } = this.props
        history.push('/signup')
    }
    onClickLogout = () => () => {
        const { history, changeSesionState, handleDrawerClose, Auth } = this.props
        handleDrawerClose()
        changeSesionState(false)
        console.log(Auth)
        Auth.logout()
        history.push('/login')
    }

    render() {
        const { classes, drawerState, sesionState, handleDrawerOpen, Auth:{ isAdmin } } = this.props
        return (
            <AppBar position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: drawerState,
                })}
            >
                <Toolbar disableGutters={!drawerState} className={classes.toolbar}>
                    {sesionState && isAdmin() && (
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, drawerState && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )
                    }
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff', paddingLeft: '20px' }}>
                            Hotel
                        </Link>
                    </Typography>
                    <div className={classes.buttonsPadding}>
                        {
                            !sesionState && (
                                <Fragment>
                                    <Button color="inherit" onClick={this.onClickSignup()}>Signup</Button>
                                    <Button color="inherit" onClick={this.onClickLogin()}>Login</Button>
                                </Fragment>
                            )
                        }
                        {
                            sesionState && <Button color="inherit" onClick={this.onClickLogout()}>logout</Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withContext(withStyles(styles, { withTheme: true })(Header))