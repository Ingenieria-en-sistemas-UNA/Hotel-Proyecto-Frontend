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
import Client from '../Components/Maintenance/customers/Client'
import Checkout from '../Components/checkout/Checkout'
import RoomPDF from '../Components/PDF/RoomPDF'
class AppRoutes extends Component {
    
    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/rooms" component={Room}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <AdminRoute exact path="/rooms-maintenance" component={RoomMaintenance} />
                    <Route exact path="/room-pdf" component={RoomPDF}/>
                    <Route exact path='/checkout' component={Checkout}/>
                    <Redirect to="/" />
                </Switch>
            </Layout>
        )
    }
}

export default withContext(AppRoutes)