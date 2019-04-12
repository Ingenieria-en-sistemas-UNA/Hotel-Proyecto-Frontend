import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { withContext } from '../store/Context'

export default withContext(
    ({ component: Component, sesionState, ...rest }) => (
        <Route {...rest} render={(props) => (
            sesionState === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
)