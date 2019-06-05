import React, { Component, Fragment } from 'react'
import { Menu, MenuItem, withStyles, IconButton  } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';
import MoreIcon from '@material-ui/icons/MoreVert'
import { withContext } from '../../../../store/Context'

const styles = theme => ({
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
});


class MenuAccount extends Component {
    state = {
        anchorEl: null
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleRouteClick = () => {
        const { history } = this.props
        this.handleMenuClose();
        history.push('/account')
    };

    onClickLogout = () => {
        const { history, changeSessionState, handleDrawerClose, Auth } = this.props;
        handleDrawerClose();
        changeSessionState(false);
        console.log(Auth);
        Auth.logout();
        history.push('/login')
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget })
    };

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        const popMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleRouteClick}>Perfil</MenuItem>
                <MenuItem onClick={this.onClickLogout}>Cerrar sesión</MenuItem>
            </Menu>
        );

        return (
            <Fragment>
                <div className={classes.sectionDesktop}>
                    <IconButton
                        aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton aria-haspopup="true" onClick={this.handleProfileMenuOpen} color="inherit">
                        <MoreIcon />
                    </IconButton>
                </div>
                {
                    popMenu
                }
            </Fragment>
        )

    }
}

export default withContext(withStyles(styles)(MenuAccount))