import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AuthService from '../../auth/AuthService'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
}

export default class Header extends Component {

    constructor() {
        super()
        this.Auth = new AuthService();
    }

    onClickLogin = () => () => {
        const { history } = this.props
        history.push('/login')
    }
    onClickLogout = () => () => {
        const { history, logged } = this.props
        logged(false)
        this.Auth.logout();
        history.push('/login')
    }
    render(){
        const { toggleDrawer, isLogged } = this.props
        return(
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer("left", this.Auth.loggedIn())}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Hotel</Link>
                        </Typography>
                        {
                            !isLogged && <Button color="inherit" onClick={this.onClickLogin()}>Login</Button>
                        }
                        {
                             isLogged && <Button color="inherit" onClick={this.onClickLogout()}>logout</Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}