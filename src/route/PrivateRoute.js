import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withContext } from '../store/Context'

export default withContext(
    ({ component: Component, Auth: { loggedIn }, ...rest }) => (
        <Route {...rest} render={(props) => (
            loggedIn()
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
)