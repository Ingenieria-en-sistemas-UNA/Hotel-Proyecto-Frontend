import React, { Component } from 'react'
import AppRoute from './route/routes'
import AuthService from './auth/AuthService'
import { Provider } from './store/Context'

class App extends Component {

    state = {
        headerOptionSelected: 0,
        sessionState: false,
        Auth: new AuthService(),
        history: this.props.history,
        drawerState: false,
        room: {}
    };

    componentDidMount() {
        const { Auth: { loggedIn, getProfile } } = this.state;
        this.changeSessionState(loggedIn());
        if (loggedIn()) {
            const { user_data } = getProfile();
            this.setState(prevState => ({
                ...prevState,
                user_data: {
                    ...user_data
                }
            }))
        }
    }

    handleChangeHeaderOption = (event, value) => {
        this.setState({ headerOptionSelected: value });
    };


    changeSessionState = sessionState => {
        this.setState({ sessionState })
    };

    handleDrawerOpen = () => {
        this.setState({ drawerState: true })
    };

    handleDrawerClose = () => {
        this.setState({ drawerState: false })
    };

    handlerChangeRoom = room => () => {
        this.setState(prevState => ({ ...prevState, room }))
        this.state.history.push('/checkout')
    }

    handlerDeleteRoom = () => {
        this.setState({ room: {} })
    }

    getContext = () => ({
        ...this.state,
        changeSessionState: this.changeSessionState,
        handleDrawerOpen: this.handleDrawerOpen,
        handleDrawerClose: this.handleDrawerClose,
        handleChangeSignup: this.handleChangeSignup,
        handleChangeHeaderOption: this.handleChangeHeaderOption,
        handlerReserveRoom: this.handlerChangeRoom
    });

    render() {
        console.log(this.getContext())
        return (
            <Provider value={this.getContext()}>
                <AppRoute />
            </Provider>
        )
    }
}

export default App
