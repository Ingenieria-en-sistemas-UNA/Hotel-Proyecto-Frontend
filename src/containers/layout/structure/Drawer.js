import React, { Component, Fragment } from 'react'
import {
    withStyles, Drawer, Divider,
    List, ListItem, IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import styles from './jss/Drawer'
import { withContext } from '../../../store/Context'

class DrawerLayout extends Component {
    render() {
        const { drawerState, classes, theme, handleDrawerClose, Auth: { isAdmin } } = this.props;
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
                {
                    isAdmin() && (
                        <Fragment>
                            <List>
                                <ListItem button component={Link} to="/clients-maintenance" onClick={handleDrawerClose}>
                                    Mantenimiento Usuarios
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button component={Link} to="/rooms-maintenance" onClick={handleDrawerClose}>
                                    Mantenimiento Habitaciones
                                </ListItem>
                            </List>
                            <Divider />
                            <List>
                                <ListItem button component={Link} to="/voucher" onClick={handleDrawerClose}>
                                    Facturación
                                </ListItem>
                            </List>
                        </Fragment>
                    )
                }
                <Divider />
                <List className={classes.drawerButton}>
                    <ListItem button component={Link} to="/rooms" onClick={handleDrawerClose}>
                        Habitaciones
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        )
    }
}

export default withContext(withStyles(styles, { withTheme: true })(DrawerLayout))
