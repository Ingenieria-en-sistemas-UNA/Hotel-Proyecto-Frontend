import React, { Component, Fragment } from 'react'
import Card from './Card'
import { withContext } from'../../../store/Context'
import config from '../../../assets/js/config'
class Room extends Component {
    state = {
        rooms: []
    }
    async componentDidMount() {
        const { Auth: { fetch: fetchAPI } } = this.props
        try{
            const rooms = await fetchAPI(`${config.URL}/room`, {
                method: 'GET'
            })
            console.log(rooms)
            this.setState({
                rooms
            })

        }catch (error) {
            throw error
        }
    }


    render(){
        const { rooms } = this.state 
        return (
            <Fragment>
                {
                    rooms.length && rooms.map(room => {
                        console.log(room)
                        return <Card key={room.id} {...room}/>
                    })
                }
            </Fragment>
            )
    }
}

export default withContext(Room)