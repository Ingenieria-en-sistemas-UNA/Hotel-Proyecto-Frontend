import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from './containers/layout'
import Login from './containers/Samples/Login'

const AppRoutes = () =>
<Layout>
    <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
    </Switch>
</Layout>

export default AppRoutes;