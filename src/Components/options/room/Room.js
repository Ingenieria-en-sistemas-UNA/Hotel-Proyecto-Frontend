import React, { Component, Fragment } from 'react'
import Card from '../../card/Card'
import { withContext } from '../../../store/Context'
import Message from '../../Message'
import { Grid } from '@material-ui/core'
import config from '../../../config/config'
class Room extends Component {
    state = {
        errors: {}
    };

    filterRooms = async (filter = 'all', initialDate = null, finishDate = null) => {
        const { Auth: { getServerError, refrech } } = this.props
        refrech()
        try {
            const rooms = await this.getRooms(filter, initialDate, finishDate)
            let nothing = rooms.length ? false : true
            this.setState({
                rooms,
                nothing
            })
            if (this.state.nothing) {
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

    componentWillMount() {
        setTimeout(() => {
            this.recursionRooms()
        }, 1000)
    }

    isTheSame = roomsRecursive => {
        const { rooms } = this.state
        let isTheSame = true
        roomsRecursive.forEach(recursionRoom => {
            rooms.forEach(room => {
                if (recursionRoom.id === room.id) {
                    if (recursionRoom.state !== room.state) {
                        isTheSame = false
                    }
                }
            })
        })
        return isTheSame
    }
    recursionRooms = async () => {
        const { Auth: { getServerError }, history: { location: { pathname } } } = this.props
        if (pathname === '/rooms') {
            try {
                const rooms = await this.getRooms()
                if (!this.isTheSame(rooms)) {
                    let nothing = rooms.length ? false : true
                    this.setState({
                        rooms,
                        nothing
                    })
                    if (this.state.nothing) {
                        setTimeout(() => {
                            this.setState({
                                nothing: false
                            })
                        }, 3000)
                    }
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
            setTimeout(() => {
                this.recursionRooms()
            }, 1000)
        }
    }

    getRooms = async (filter = 'all', initialDate = null, finishDate = null) => {
        const { Auth: { fetch: fetchAPI } } = this.props
        const rooms = await fetchAPI(`${config.URL}/room/list?filter=${filter}`, {
            method: 'POST',
            body: JSON.stringify({ initialDate, finishDate })
        })
        return rooms
    }

    handlerReserveRoomValidate = room => () => {
        const { Auth: { getProfile }, handlerReserveRoom } = this.props
        const { user_data } = getProfile()
        if (user_data.maxReserve > 0) {
            handlerReserveRoom(room)
        }
        this.setState({
            errors: {
                general: 'Cantidad maxima de reservaciones cubierta',
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

    render() {
        const { rooms, errors, nothing } = this.state;
        return (
            <Fragment>
                <Grid container justify='space-around' direction='row' wrap='wrap' style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {
                        rooms && rooms.map((room, index) => (
                            <Card
                                key={room.id}
                                room={room}
                                index={index}
                                handlerReserveRoomValidate={this.handlerReserveRoomValidate}
                            />
                        ))
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