import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './containers/layout'
import { Login } from './containers/Login'
import Loggin from './Components/Loggin'


class AppRoutes extends Component {
    render(){
        const { history, sesionState, changeSesionState } = this.props
        return(
            <Layout history={history} sesionState={sesionState} changeSesionState={changeSesionState}>
                <Switch>
                    <Route exact path="/" component={Loggin}/>
                    <Route exact path="/login" render={() => <Login changeSesionState={changeSesionState} history={history}/>}/>
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default AppRoutes;