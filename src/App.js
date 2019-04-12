import React, { Component } from 'react';
import AppRoute from './route/routes'
import AuthService from './auth/AuthService'
import { Provider } from './store/Context'
class App extends Component {

  state = { sesionState: false }

  constructor() {
    super()
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setState({ sesionState: this.Auth.loggedIn() })
  }

  changeSesionState = sesionState => {
    this.setState({ sesionState })
  }

  getContext = () => ({
    ...this.state,
    changeSesionState: this.changeSesionState,
    history: this.props.history
  })

  render() {
    return (
      <Provider value={this.getContext()}>
        <AppRoute/>
      </Provider>
    )
  }
}
export default App
