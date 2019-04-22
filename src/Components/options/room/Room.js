import React, { Component, Fragment } from 'react'
import Card from './Card'
import { withContext } from'../../../store/Context'
import Message from '../../Message'

import config from '../../../assets/js/config'
class Room extends Component {
    state = {
        errors: {}
    }
    async componentDidMount() {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try{
            const rooms = await fetchAPI(`${config.URL}/room`, {
                method: 'GET'
            })
            this.setState(prevState => ({
                ...prevState,
                rooms
            }))

        }catch ({ message }) {
            const serverError = getServerError(message) 
            this.setState({
                errors: { 
                    general: serverError,
                }
            })

            setTimeout(() => {
                this.setState({ 
                    errors: {
                        general: false
                    }
                })
            }, 3000)
        }
    }


    render(){
        const { rooms, errors } = this.state 
        return (
            <Fragment>
                {
                    rooms && rooms.map(room => <Card key={room.id} {...room}/>)
                }
                {
                    errors.general && <Message message={errors.general} type={"error"} />
                }
            </Fragment>
            )
    }
}

export default withContext(Room)