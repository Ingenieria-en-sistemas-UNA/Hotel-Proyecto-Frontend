import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from '../containers/layout'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import { Login, Signup } from '../Components/Login'
import Room from '../Components/options/room/Room'
import RoomMaintenance from '../Components/Maintenance/room/Room'
import Home from '../Components/home/Home'
import { withContext } from '../store/Context'
import ClientMaintenance from '../Components/Maintenance/customers/Client'
import Checkout from '../Components/checkout/Checkout'
import Account from '../Components/Profile/Account'
import Voucher from '../Components/Maintenance/voucher/Voucher';


class AppRoutes extends Component {
    
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/rooms" component={Room}/>
                    <PrivateRoute exact path="/account" component={Account}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <AdminRoute exact path="/rooms-maintenance" component={RoomMaintenance} />
                    <AdminRoute exact path="/clients-maintenance" component={ClientMaintenance} />
                    <Route exact path='/checkout' component={Checkout}/>
                    <AdminRoute exact path="/voucher" component={Voucher} />
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default withContext(AppRoutes)