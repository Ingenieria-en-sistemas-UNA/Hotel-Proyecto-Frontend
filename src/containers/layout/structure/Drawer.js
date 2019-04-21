import React, { Component } from 'react'
import {
    withStyles,
    Drawer,
    Divider,
    List,
    ListItem,
    IconButton
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import styles from './jss/Drawer'
import { withContext } from '../../../store/Context'

class DrawerLayout extends Component {
    render() {
        const { drawerState, classes, theme, handleDrawerClose } = this.props
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerState}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        Mantenimiento Usuarios
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        Mantenimiento Habitaciones
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withContext(withStyles(styles, { withTheme: true })(DrawerLayout))
