import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './containers/layout'
import { Login } from './containers/Login'
import Loggin from './Components/Loggin'


const PrivateRoute = ({ component: Component, sesionState,  ...rest }) => (
    <Route {...rest} render={(props) => (
        sesionState === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)


class AppRoutes extends Component {
    
    render() {
        const { history, sesionState, changeSesionState } = this.props
        return (
            <Layout history={history} sesionState={sesionState} changeSesionState={changeSesionState}>
                <Switch>
                    <PrivateRoute exact path="/" component={Loggin} sesionState={sesionState} />
                    <Route exact path="/login" render={() => <Login changeSesionState={changeSesionState} history={history} />} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default AppRoutes;