import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from '../containers/layout'
import PrivateRoute from './PrivateRoute'
import { Login, Signup } from '../containers/Login'
import Room from '../Components/options/room/Room'
import Loggin from '../Components/Loggin'
import { withContext } from '../store/Context'



class AppRoutes extends Component {
    
    render() {
        return (
            <Layout>
                <Switch>
                    <PrivateRoute exact path="/" component={Loggin}/>
                    <PrivateRoute exact path="/rooms" component={Room}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default withContext(AppRoutes)