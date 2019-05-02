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

    handleChangeFile = e => {
        const { files } = e.target
        const [file] = files
        console.log(file)
        this.setState(({ form, ...rest }) => ({
            ...rest,
            form: {
                ...form,
                file
            }
        }))
    }

    handleChange = e => {
        const { target: { name = 'price', value } } = e
        this.setState(({ form, ...rest }) => ({
            ...rest,
            form: {
                ...form,
                [name]: value,
            }
        }))
    }

    handlerSubmit = async e => {
        e.preventDefault()
        const { Auth: { getToken, _checkStatus } } = this.props, { form: { file, ...rest }, rooms: roomsState } = this.state
        const formData = new FormData()
        formData.append('file', file)
        formData.append('room', new Blob(
            [JSON.stringify(rest)], {
                type: "application/json"
            }
        ))
        try {
            const room = await fetch(`${config.URL}/room`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + getToken()
                },
                body: formData
            }).then(_checkStatus).then(response => response.json())
            

            const rooms = [...roomsState, room];
            this.setState(({ form, ...rest }) => ({
                ...rest,
                rooms,
                form: {
                    type: '',
                    description: '',
                    guests: '',
                    price: '',
                    state: false,
                    file: false
                }
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

    handleClickOpen = () => {
        this.setState({ openForm: true })
    }

    handleClose = () => {
        this.setState({
            openForm: false,
            form: {
                type: '',
                description: '',
                guests: '',
                price: '',
                file: ''
            }
        })
    }

    componentDidMount() {
        this.filterRooms()
    }

    render() {
        const { rooms, errors, openForm, form } = this.state
        return (<Fragment> {
            rooms && (<Table
                rows={rows}
                data={rooms}
                title={'Gestion de habitaciones'}
                handlerChangeFilter={this.handlerChangeFilter}
                handleClickOpen={this.handleClickOpen}
            />
            )
        } {
                errors.general && <Message message={errors.general}
                    type={"error"}
                />
            } <FormRoom
                open={openForm}
                handleClose={this.handleClose}
                object={form}
                handleChangeObject={this.handleChange}
                handlerSubmit={this.handlerSubmit}
                handleChangeFile={this.handleChangeFile}
            />
        </Fragment>
        )
    }
}

export default withContext(Room)