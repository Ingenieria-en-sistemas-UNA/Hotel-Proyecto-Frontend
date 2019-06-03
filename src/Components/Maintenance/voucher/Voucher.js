import React, { Component, Fragment } from 'react'
import Table from '../../Table/Table'
import config from '../../../config/config'
import Message from '../../Message'
import { withContext } from '../../../store/Context'

const configTable = {
    rows: [
        { id: 'id', numeric: false, disablePadding: true, label: '# Factura' },
        { id: 'emitter', numeric: false, disablePadding: false, label: 'Emisor' },
        { id: 'receiver', numeric: true, disablePadding: false, label: 'Receptor' },
        { id: 'detail', numeric: true, disablePadding: false, label: 'Detalle' },
        { id: 'localDate', numeric: true, disablePadding: false, label: 'Fecha' },
        { id: 'price', numeric: false, disablePadding: false, label: 'Precio' },
        { id: 'numberNight', numeric: false, disablePadding: false, label: 'Noches' }
    ],
    column: {
        id: false,
        emitter: false,
        receiver: false,
        detail: false,
        localDate: false,
        price: false,
        numberNight: false,
    }
}

class Voucher extends Component {
    state = {
        errors: {},
        form: {
            id: '',
            emmiter: '',
            reveicer: '',
            detail: '',
            LocalDate: '',
            numberNight:'',
        }
    }

    handlerDeleteItems = async (ItemsSelected) => {
        const { Auth: { fetch: fetchAPI } } = this.props
        try {
            await fetchAPI(`${config.URL}/voucher`, {
                method: 'DELETE',
                body: JSON.stringify(ItemsSelected)
            })
            this.filterVouchers()
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


    handlerChangeFilter = ({ target: { value } }) => {
        if (value !== '') {
            this.filterVouchers(value)
        } else {
            this.filterVouchers()
        }
    }


    filterVouchers = async (filter = 'all') => {
        const { Auth: { fetch: fetchAPI, getServerError } } = this.props
        try {
            const vouchers = await fetchAPI(`${config.URL}/voucher?filter=all`, {
                method: 'GET'
            })
            console.log(vouchers)
            let nothing = vouchers.length ? false : true
            this.setState({
                vouchers,
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
        this.filterVouchers()
    }

    handlerUpdateItem = itemUpdate => () => {

    }

    render() {
        const { vouchers, errors, success, nothing } = this.state
        const config = { ...configTable,  data: vouchers }
        console.log(vouchers)
        return (<Fragment>
            {
            vouchers && (<Table
                    config={config}
                    title='Facturación'
                    update={false}
                    handlerChangeFilter={this.handlerChangeFilter}
                    handleClickOpen={this.handleClickOpen}
                    handlerUpdateItem={this.handlerUpdateItem}
                    handlerDeleteItems={this.handlerDeleteItems}
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
                nothing && <Message message="No hay Facturas" type="info" />
            }
        </Fragment>
        )
    }
}

export default withContext(Voucher)