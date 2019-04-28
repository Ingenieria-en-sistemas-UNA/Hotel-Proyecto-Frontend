import React, { Component } from 'react'

import { Grid, withStyles } from '@material-ui/core'
import classNames from 'classnames';
import styles from './jss/Container'
import { withContext } from '../../../store/Context'



class Container extends Component {

    render() {
        const { children, classes, drawerState } = this.props
        return (
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: drawerState,
                })}
            >
                <div className={classes.drawerHeader} style={{ minHeight: '50px'}}/>
                <Grid spacing={24} container justify="center">
                    <Grid
                        container
                        className={classes.container}
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item sm={12} style={{textAlign: 'center'}}>
                                {children}
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        )
    }
}
export default withContext(withStyles(styles, { withTheme: true })(Container))
