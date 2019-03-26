
import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import Header from '../structure/Header'

const Layout = props => {
    const { children } = props
    return (
        <Fragment>
            <Header/>
            <div>{ children }</div>
        </Fragment>
    )
}

Layout.protoType = {
    children: PropTypes.any
}

export default Layout;