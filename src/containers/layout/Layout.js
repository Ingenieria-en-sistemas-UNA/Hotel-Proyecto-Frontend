
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types'
import Header from '../structure/Header'
import Container from '../structure/Container'
import TemporaryDrawer from '../../Components/TemporaryDrawer'
class Layout extends Component {
    state = {}
    
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open
        })
      }

    render(){
        const { children, history, sesionState, changeSesionState } = this.props
        const { left = false } = this.state
        return (
            <Fragment>
                <Header
                  history={history}
                  toggleDrawer={this.toggleDrawer}
                  sesionState={sesionState}
                  changeSesionState={changeSesionState}
                />
                <TemporaryDrawer open={left} toggleDrawer={this.toggleDrawer}/>
                <Container history={history}>{ children }</Container>
            </Fragment>
        )
    }
}

Layout.protoType = {
    children: PropTypes.any
}

export default Layout;