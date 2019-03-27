import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './containers/layout'
import Login from './containers/Login'
import Loggin from './Components/Loggin'

const AppRoutes = props =>
<Layout history={props.history}>
    <Switch>
        <Route exact path="/" component={Loggin}/>
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
    </Switch>
</Layout>

export default AppRoutes;