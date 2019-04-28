import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../store/Context'

export default withContext(
    ({ component: Component, Auth: { loggedIn, isAdmin }, ...rest }) => (
        <Route {...rest} render={(props) => (
            loggedIn() && isAdmin()
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
)