import React, { Component, Fragment } from 'react'
import Table from '../../Table/Table'
import { withContext } from '../../../store/Context'
import Message from '../../Message'
import config from '../../../config/config'
import FormRoom from './components/FormRoom'
import DownloadPDF from '../../PDF/components/DownloadPDF'
import moment from 'moment'

const configTable = {
    rows: [
        { id: 'type', numeric: false, disablePadding: true, label: 'Tipo' },
        { id: 'state', numeric: false, disablePadding: false, label: 'Estado de habitación' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Precio' },
        { id: 'guests', numeric: true, disablePadding: false, label: 'Capacidad' },
        { id: 'actions', numeric: false, disablePadding: false, label: 'Acciones' }
    ],
    column: {
        type: false,
        state: { isBoolean: true, ifTrue: 'Ocupado', ifFalse: 'Disponible', customText: '' },
        price: false,
        guests: false,
    }
}
class Room extends Component {
    state = {
        errors: {},
        openForm: false,
        submmited: false,
        rooms: [],
        report: [],
        clickReport: false,
        form: {
            type: '',
            description: '',
            guests: '',
            price: '',
            localDate: moment(new Date()).format('DD/MM/YYYY'),
            state: false,
            file: false
        }
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
            this.setState(prevState => ({
                ...prevState,
                errors: {
                    general: message
                }
            }))

            setTimeout(() => {
                this.setState(prevState => ({
                    ...prevState,
                    errors: {
                        general: false
                    }
                }))
            }, 3000)
        }
    }

    handlerSubmit = async ({ file, id = false, img, ...rest }) => {
        this.setState({ submmited: true })
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
            setTimeout(() => {
                this.setState(prevState => ({
                    ...prevState,
                    success: false
                }))
            }, 3000)

        } catch ({ message }) {
            this.setState(prevState => ({
                ...prevState,
                errors: {
                    general: message
                }
            }))

            setTimeout(() => {
                this.setState(prevState => ({
                    ...prevState,
                    errors: {
                        general: false
                    }
                }))
            }, 3000)
        }
        this.setState({ submmited: false })
    }


    handlerChangeFilter = ({ target: { value } }) => {
        if (value !== '') {
            this.filterRooms(value)
        } else {
            this.filterRooms()
        }
    }


    filterRooms = async (filter = 'all', initialDate = '04/06/2019', finishDate = '05/06/2019') => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try {
            const rooms = await fetchAPI(`${config.URL}/room/list?filter=${filter}`, {
                method: 'POST',
                body: JSON.stringify({initialDate, finishDate})
            })
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
            const serverError = getServerError(message)
            this.setState(prevState => ({
                ...prevState,
                errors: {
                    general: serverError
                }
            }))

            setTimeout(() => {
                this.setState(prevState => ({
                    ...prevState,
                    errors: {
                        general: false
                    }
                }))
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

    handlerCreateReport = selectedItems => {
        const { rooms = [] } = this.state
        let report = []
        selectedItems.forEach(id => {
            rooms.forEach(room => {
                if (room.id === id) {
                    report = [...report, room]
                }
            })
        })
        this.setState(prevState => ({ ...prevState, report, clickReport: true }))
    }

    reset = () => {
        this.setState(prevState => ({ ...prevState, clickReport: false }))
    }

    getConfigReport = () => {
        const { report: data } = this.state
        return { ...configTable, data }
    }

    render() {
        const { rooms, clickReport = false, errors, openForm, form, itemUpdate, success, nothing, submmited } = this.state
        const config = { ...configTable, data: rooms }
        return (<Fragment>
            {
                rooms && (<Table
                    config={config}
                    title='Gestion de habitaciones'
                    reset={this.reset}
                    update
                    handlerChangeFilter={this.handlerChangeFilter}
                    handleClickOpen={this.handleClickOpen}
                    handlerUpdateItem={this.handlerUpdateItem}
                    handlerDeleteItems={this.handlerDeleteItems}
                    handlerCreateReport={this.handlerCreateReport}
                />
                )
            }
            {
                errors.general && <Message message={errors.general} type='error' />
            }
            {
                success && <Message message={success} type='success' />
            }
            {
                nothing && <Message message="No hay habitaciones registradas" type="info" />
            }
            <FormRoom
                open={openForm}
                handleClose={this.handleClose}
                object={form}
                itemUpdate={itemUpdate}
                submmited={submmited}
                handlerSubmit={this.handlerSubmit}
            />
            {
                clickReport && (
                    <DownloadPDF
                        config={this.getConfigReport()}
                        filename='Reporte-Atlantis-Habitaciones'
                        title='Reporte Habitaciones'
                    />
                )
            }
        </Fragment>
        )
    }
}

export default withContext(Room)