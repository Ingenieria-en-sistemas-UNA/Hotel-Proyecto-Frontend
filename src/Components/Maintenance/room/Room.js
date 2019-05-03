import React, { Component, Fragment } from 'react'
import Table from './Table/Table'
import { withContext } from '../../../store/Context'
import Message from '../../Message'
import config from '../../../config/config'
import FormRoom from './components/FormRoom'

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
        itemUpdate: false,
        openForm: false,
        form: {
            type: '',
            description: '',
            guests: '',
            price: '',
            state: false,
            file: false
        }
    }


    componentWillUpdate() {
        return true
    }

    handlerDeleteItems = async (ItemsSelected) => {
        const { Auth: { fetch: fetchAPI } } = this.props
        try {
            await fetchAPI(`${config.URL}/room`, {
                method: 'DELETE',
                body: JSON.stringify(ItemsSelected)
            })
            this.filterRooms()
        } catch ({ message }) {
            this.setState({
                errors: {
                    general: message,
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

    handlerSubmit = async ({ file, id = false, img, ...rest }) => {
        const { Auth: { getToken, _checkStatus } } = this.props, { rooms: roomsState } = this.state
        const formData = new FormData()
        let theFile = file
        if (img) {
            theFile = new File([theFile], img, { type: file.type });
        }
        formData.append('file', theFile)
        formData.append('room', new Blob(
            [JSON.stringify(rest)], {
                type: "application/json"
            }
        ))
        try {
            const headers = {
                Authorization: 'Bearer ' + getToken()
            }
            let room = {}
            if (id) {
                room = await fetch(`${config.URL}/room/${id}`, {
                    method: 'PUT',
                    headers,
                    body: formData
                }).then(_checkStatus).then(response => response.json())
            } else {
                room = await fetch(`${config.URL}/room`, {
                    method: 'POST',
                    headers,
                    body: formData
                }).then(_checkStatus).then(response => response.json())
            }


            const rooms = id ? roomsState.map(x => x.id === id ? room : x) : [...roomsState, room];
            const success = id ? "La habitación se actualizó correctamente" : "La habitación se guardó correctamente"
            this.setState(({ form, ...rest }) => ({
                ...rest,
                rooms,
                success
            }))
            this.handleClose()
        } catch ({ message }) {
            this.setState({
                errors: {
                    general: message,
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


    handlerChangeFilter = ({ target: { value } }) => {
        if (value !== '') {
            this.filterRooms(value)
        } else {
            this.filterRooms()
        }
    }


    filterRooms = async (filter = 'all') => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try {
            const rooms = await fetchAPI(`${config.URL}/room?filter=${filter}`, {
                method: 'GET'
            })
            let nothing = rooms.lenght > 0 ? false : true
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

    handleClickOpen = () => {
        this.setState({ openForm: true })
    }

    handleClose = () => {
        this.setState({
            openForm: false,
            itemUpdate: false
        })
    }

    componentDidMount() {
        this.filterRooms()
    }

    handlerUpdateItem = itemUpdate => () => {
        this.setState(prevState => ({
            ...prevState,
            openForm: true,
            itemUpdate
        }))
    }
    render() {
        const { rooms, errors, openForm, form, itemUpdate, success, nothing } = this.state
        return (<Fragment>
            {
                rooms && (<Table
                    rows={rows}
                    data={rooms}
                    title={'Gestion de habitaciones'}
                    handlerChangeFilter={this.handlerChangeFilter}
                    handleClickOpen={this.handleClickOpen}
                    handlerUpdateItem={this.handlerUpdateItem}
                    handlerDeleteItems={this.handlerDeleteItems}
                />
                )
            }
            {
                errors.general && <Message message={errors.general} type={"error"} />
            }
            {
                success && <Message message={success} type={"success"} />
            }
            {
                nothing && <Message message="No hay habitaciones registradas" type="info" />
            }
            <FormRoom
                open={openForm}
                handleClose={this.handleClose}
                object={form}
                itemUpdate={itemUpdate}
                handlerSubmit={this.handlerSubmit}
            />
        </Fragment>
        )
    }
}

export default withContext(Room)