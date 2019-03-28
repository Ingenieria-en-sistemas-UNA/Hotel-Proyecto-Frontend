import React, { Component } from 'react'
import AuthService from '../../auth/AuthService'

import { Grid } from '@material-ui/core'

const styles = theme => ({
    demo: {
      height: 240,
      background: "#f00",
      [theme.breakpoints.up("lg")]: {
        width: 1170
      }
    }
  })


export default class Container extends Component {
    constructor() {
        super()
        this.Auth = new AuthService();
    }
    componentWillMount() {
        if (!this.Auth.loggedIn()) {
            this.props.history.push('/login');
        }
    }

    
    render() {
        const { children } = this.props
        return (
            <Grid container justify="center">
                <Grid
                    container
                    className={styles.demo}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>{ children  }</Grid>
                </Grid>
            </Grid>
        )
    }
}
