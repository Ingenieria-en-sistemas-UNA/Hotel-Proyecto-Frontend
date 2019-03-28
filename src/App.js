import React, { Component } from 'react';
import AppRoute from './routes'
import AuthService from './auth/AuthService'
class App extends Component {

  state = {}

  constructor() {
    super()
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setState({ sesionState: this.Auth.loggedIn() })
  }

  changeSesionState = sesionState => {
    this.setState({sesionState})
  }


  render() {
    const { sesionState } = this.state
    const { history } = this.props
    return <AppRoute
              history={history}
              sesionState={sesionState}
              changeSesionState={this.changeSesionState}
            />
  }
}
export default App
