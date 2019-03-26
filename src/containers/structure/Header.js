import React from 'react'
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
};

export default props =>
    <div style={styles.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" style={styles.grow}>
                    Hotel
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    </div>