import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AuthService from '../../auth/AuthService'
import { withContext } from '../../store/Context' 

const styles = {
    root: {
        flexGrow: 1,
        paddingBottom: 64
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
}

class Header extends Component {

    constructor(){
        super()
        this.Auth = new AuthService()
    }

    onClickLogin = () => () => {
        const { history } = this.props
        history.push('/login')
    }
    onClickSignup = () => () => {
        const { history } = this.props
        history.push('/signup')
    }
    onClickLogout = () => () => {
        const { history, changeSesionState } = this.props
        changeSesionState(false)
        this.Auth.logout();
        history.push('/login')
    }

    render(){
        const { toggleDrawer, sesionState } = this.props
        return(
            <div style={styles.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        {
                            sesionState && (
                                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer("left", sesionState)}>
                                    <MenuIcon />
                                </IconButton>
                            )
                        }
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Hotel</Link>
                        </Typography>
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
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default withContext(Header)