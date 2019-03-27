
import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import Header from '../structure/Header'
import Container from '../structure/Container'

const Layout = props => {
    const { children, history } = props
    return (
        <Fragment>
            <Header history={history}/>
            <Container history={history}>{ children }</Container>
        </Fragment>
    )
}

Layout.protoType = {
    children: PropTypes.any
}

export default Layout;