import React, { Component } from 'react'

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
                    <Grid item xs={10}>{ children }</Grid>
                </Grid>
            </Grid>
        )
    }
}
