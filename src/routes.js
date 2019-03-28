import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthService from './auth/AuthService'
import { Layout } from './containers/layout'
import { Login } from './containers/Login'
import Loggin from './Components/Loggin'


class AppRoutes extends Component {
    constructor() {
        super()
        this.Auth = new AuthService();
    }
    state = {}

    componentDidMount() {
        this.setState({isLogged: this.Auth.loggedIn()})
    }

    getIsLogged = isLogged => {
        this.setState({isLogged})
    }
    render(){
        const { history } = this.props
        const { isLogged } = this.state
        return(
            <Layout history={history} isLogged={isLogged} logged={this.getIsLogged}>
                <Switch>
                    <Route exact path="/" component={Loggin}/>
                    <Route exact path="/login" render={() => <Login logged={this.getIsLogged} history={history}/>}/>
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default AppRoutes;