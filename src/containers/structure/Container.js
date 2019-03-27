import React, { Component } from 'react'
import AuthService from '../../auth/AuthService'

import { Grid } from '@material-ui/core' 
export default class Container extends Component {
    constructor() {
        super()
        this.Auth = new AuthService();
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.push('/login');
        }
    }
    render(){
        const { children } = this.props
        return(
            <Grid container alignContent="center" spacing={16}>
                    <Grid item xs={12}>{children}</Grid>
            </Grid>
        )
    }
}
