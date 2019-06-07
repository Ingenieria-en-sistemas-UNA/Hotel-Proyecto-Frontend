import React, { Component, Fragment } from 'react'
import Table from '../../Table/Table'
import config from '../../../config/config'
import Message from '../../Message'
import { withContext } from '../../../store/Context'
import DownloadPDF from '../../PDF/components/DownloadPDF'
import moment from 'moment'
import PDF from '../../PDF/components/PDF'

const configTable = {
    rows: [
        { id: 'id', numeric: false, disablePadding: true, label: 'Cédula' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Correo Electronico' },
        { id: 'address', numeric: false, disablePadding: false, label: 'Dirección' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Nombre' },
        { id: 'lastName', numeric: false, disablePadding: false, label: 'Apellidos' },
        { id: 'cellphone', numeric: true, disablePadding: false, label: 'Teléfono' },
        { id: 'localDate', numeric: true, disablePadding: false, label: 'Fecha de creación' }
    ],
    column: {
        id: false,
        email: false,
        address: false,
        name: false,
        lastName: false,
        cellphone: false,
        localDate: false
    }
}

class Client extends Component {
    state = {
        errors: {},
        report: [],
        clickReport: false,
    }

    handlerDeleteItems = async (ItemsSelected) => {
        const { Auth: { fetch: fetchAPI } } = this.props
        try {
            await fetchAPI(`${config.URL}/client`, {
                method: 'DELETE',
                body: JSON.stringify(ItemsSelected)
            })
            this.filterClients()
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

    handlerSubmit = () => {

    }


    handlerChangeFilter = ({search = null, initialDate = null, finishDate = null}) => {
        if (!search && (!initialDate && !finishDate)) {
            this.filterClients()
        } else if (search && (!initialDate && !finishDate)){
            this.filterClients(search)
        } else if (!search && (initialDate && finishDate)){
            this.filterClients('all', initialDate, finishDate)
        }else if(search && (initialDate && finishDate)){
            this.filterClients(search, initialDate, finishDate)
        }
    }


    filterClients = async (filter = 'all', initialDate = null, finishDate = null) => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try {
            if(initialDate && finishDate){
                if (initialDate > finishDate) {
                    throw new Error('La fecha inicial no puede ser menor que la final')
                 }
            }
            const clients = await fetchAPI(`${config.URL}/client/list?filter=${filter}`, {
                method: 'POST',
                body: JSON.stringify({
                    initialDate: initialDate ? moment(initialDate).format('DD/MM/YYYY') : initialDate, 
                    finishDate: finishDate ? moment(finishDate).format('DD/MM/YYYY') : finishDate
                })
            })
            let nothing = clients.length ? false : true
            this.setState({
                clients,
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
    }

    handleClose = () => {
    }

    componentDidMount() {
        this.filterClients()
    }

    handlerUpdateItem = itemUpdate => () => {

    }

    getClientFormatTable = (clients = []) => {
        let array = []
        clients.forEach(({ person, id, ...rest }) => {
            if (id !== 1) {
                array = [...array, { ...person, ...rest, id: person.id }]
            }
        })
        return array
    }

    handlerCreateReport = selectedItems => {
        const { clients = [] } = this.state
        let report = []
        const clientsFormatTable = this.getClientFormatTable(clients)
        selectedItems.forEach(id => {
            clientsFormatTable.forEach(client => {
                if (client.id === id) {
                    report = [...report, client]
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
        const { clients: jsonFormat, clickReport = false, errors, success, nothing } = this.state
        const clients = this.getClientFormatTable(jsonFormat)
        const config = { ...configTable, data: clients }
        return (<Fragment>
            {
                jsonFormat && (<Table
                    config={config}
                    title='Gestion de clientes'
                    reset={this.reset}
                    update={false}
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
                nothing && <Message message="No hay clientes registrados" type="info" />
            }
            {
                clickReport && (
                    <DownloadPDF
                        PDF={<PDF config={this.getConfigReport()} title='Reporte Clientes' />}
                        filename='Reporte-Atlantis-Clientes'
                        config={this.getConfigReport()}
                    />
                )
            }
        </Fragment>
        )
    }
}

export default withContext(Client)