import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import MenuIcon from '@material-ui/icons/Menu'
import { withContext } from '../../../store/Context'
import MenuAccount from './components/MenuAccount'
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
        history.push('/')
    }

    render() {
        const { classes, drawerState, sesionState, handleDrawerOpen, Auth: { isAdmin } } = this.props
        return (
            <Fragment>
                <AppBar position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: drawerState,
                    })}
                >
                    <Toolbar disableGutters={!drawerState} className={classes.toolbar} style={{ minHeight: '45px' }}>
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
                        <div className={classes.title}>
                            <Typography variant="h5" color="inherit" noWrap className={classes.options}>
                                <Link to="/" className={classes.links}>
                                    ATLANTIS
                                </Link>
                            </Typography>
                            {sesionState && (
                                <Typography variant="h6" color="inherit" noWrap className={classes.options}>
                                    <Link to="/rooms" className={classes.links}>
                                        Habitaciones
                                    </Link>
                                </Typography>
                            )}
                        </div>
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
                                sesionState && <MenuAccount />
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}
export default withContext(withStyles(styles, { withTheme: true })(Header))