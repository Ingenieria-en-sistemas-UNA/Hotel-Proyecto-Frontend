import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

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

    onClickLogin = () => () => {
        const { history } = this.props
        history.push('/login')
    }

    render(){
        return(
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Hotel</Link>
                        </Typography>
                        <Button color="inherit" onClick={this.onClickLogin()}>Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}