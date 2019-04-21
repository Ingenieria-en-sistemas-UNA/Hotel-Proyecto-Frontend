import React, { Component } from 'react'
import AppRoute from './route/routes'
import AuthService from './auth/AuthService'
import { Provider } from './store/Context'

class App extends Component {

  state = {
    sesionState: false,
    Auth: new AuthService(),
    history: this.props.history,
    drawerState: false,
  }

  componentDidMount() {
    const { Auth: { loggedIn } } = this.state
    this.changeSesionState(loggedIn())
  }

  changeSesionState = sesionState => {
    this.setState({ sesionState })
  }

  handleDrawerOpen = () => {
    this.setState({ drawerState: true })
  }

  handleDrawerClose = () => {
    this.setState({ drawerState: false })
  }

  getContext = () => ({
    ...this.state,
    changeSesionState: this.changeSesionState,
    handleDrawerOpen: this.handleDrawerOpen,
    handleDrawerClose: this.handleDrawerClose,
    handleChangeSignup: this.handleChangeSignup,
  })

  render() {
    return (
      <Provider value={this.getContext()}>
        <AppRoute />
      </Provider>
    )
  }
}
export default App
