import React, { Component, Fragment } from 'react'
import Table from './Table/Table'
import { withContext } from '../../../store/Context'
import Message from '../../Message'
import config from '../../../assets/js/config'
import AdminRoute from '../../../route/AdminRoute'

const rows = [
    { id: 'type', numeric: false, disablePadding: true, label: 'Tipo' },
    { id: 'state', numeric: false, disablePadding: false, label: 'Estado de habitación' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Precio' },
    { id: 'guests', numeric: true, disablePadding: false, label: 'Capacidad' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Acciones' }
]

class Room extends Component {
    state = {
        errors: {},
    }

    handlerChangeFilter = ({ target: { value } }) => {
        if(value !== ''){
            this.filterRooms(value)
        } else {
            this.filterRooms()
        }
    }


    filterRooms = async(filter = 'all') => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try {
            const rooms = await fetchAPI(`${config.URL}/room?filter=${filter}`, {
                method: 'GET'
            })
            this.setState({
                rooms
            })

        } catch ({ message }) {
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

    componentDidMount() {
        this.filterRooms()
    }

    render() {
        const { rooms, errors } = this.state
        return (
            <Fragment>
                {rooms && (
                    <Table rows={rows} data={rooms} title={'Gestion de habitaciones'} handlerChangeFilter={this.handlerChangeFilter} />
                    )
                }
                {
                    errors.general && <Message message={errors.general} type={"error"} />
                }
            </Fragment>
        )
    }
}

export default withContext(Room)