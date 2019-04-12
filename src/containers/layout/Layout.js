
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types'
import Header from '../structure/Header'
import Container from '../structure/Container'
import TemporaryDrawer from '../../Components/TemporaryDrawer'
class Layout extends Component {

  state = { left: false }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { children } = this.props
    const { left } = this.state
    return (
      <Fragment>
        <Header
          toggleDrawer={this.toggleDrawer}
        />
        <TemporaryDrawer open={left} toggleDrawer={this.toggleDrawer} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

Layout.protoType = {
  children: PropTypes.any
}

export default Layout;