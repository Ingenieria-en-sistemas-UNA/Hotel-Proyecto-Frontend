import React, { Component, Fragment } from 'react'
import Card from './Card'
import { withContext } from'../../../store/Context'
import Message from '../../Message'
import { Grid } from '@material-ui/core'

import config from '../../../config/config'
class Room extends Component {
    state = {
        errors: {}
    };

    filterRooms = async(filter = 'all') => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props;
        try {
            const rooms = await fetchAPI(`${config.URL}/room?filter=${filter}`, {
                method: 'GET'
            });
            let nothing = rooms.length ? false : true
            this.setState({
                rooms,
                nothing
            })
            if(this.state.nothing){
                setTimeout(() => {
                    this.setState({
                        nothing: false
                    })
                }, 3000)
            }
        } catch ({ message }) {
            const serverError = getServerError(message);
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

    async componentDidMount() {
        this.filterRooms()
    }

    render(){
        const { rooms, errors, nothing } = this.state;
        return (
            <Fragment>
                <Grid container justify='space-around' direction='row' wrap='wrap' style={{ display: 'flex', alignItems: 'flex-start'}}>
                    {
                        rooms && rooms.map((room, index) => <Card key={room.id} {...room} index={index} />)
                    }
                </Grid>
                {
                    errors.general && <Message message={errors.general} type={"error"} />
                }
                {
                    nothing && <Message message="No hay habitaciones registradas" type="info" />
                }
            </Fragment>
            )
    }
}

export default withContext(Room)