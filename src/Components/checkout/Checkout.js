import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { withContext } from '../../store/Context'
import ClientForm from './ClientForm'
import RoomForm from './RoomForm'
import Review from './Review'
import moment from 'moment'
import config from '../../config/config'
import Message from '../Message'

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
    stepper: {
        padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    },
})

const steps = ['Confirmación de datos', 'Datos de habitación', 'Resumen de orden']

const getStepContent = ({ activeStep, ...rest }) => {
    switch (activeStep) {
        case 0:
            return <ClientForm {...rest} />
        case 1:
            return <RoomForm {...rest} />
        case 2:
            return <Review {...rest} />
        default:
            throw new Error('Unknown step')
    }
}

class Checkout extends Component {
    state = {
        activeStep: 0,
        errors: {},
        room: {},
        client: { person: {} },
        voucher: {
            numberNight: 1,
            price: 0,
            detail: '',
            emitter: 'ATLANTIS',
            receiver: '',
            localDate: moment(new Date()).format('DD/MM/YYYY')
        }
    }


    componentDidMount() {
        const { user_data: client = { person: {} }, room, history } = this.props
        if (room.id) {
            return this.setState(prevState => ({ ...prevState, client, room, voucher: { ...prevState.voucher, price: room.price, receiver: client.person.name, detail: `Reservación de una habitación de tipo: ${room.type}` } }))
        }
        history.push('/')
    }

    handleNext = () => {
        const { activeStep } = this.state
        if (activeStep !== steps.length - 1) {
            return this.setState(state => ({
                activeStep: state.activeStep + 1,
            }))
        }
        this.reserveRoom()
    }

    reserveRoom = async () => {
        const { voucher, client, room } = this.state
        const { Auth: { fetch: fetchAPI } } = this.props

        try {
            const response = await fetchAPI(`${config.URL}/reserve`, {
                method: 'POST',
                body: JSON.stringify({ client, room, voucher })
            })
            if (response.id) {
                throw new Error('Algo ha ocurrido, porfavor intente más tarde')
            }
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }))
        }
        catch ({ message }) {
            this.setState(({ activeStep }) => ({
                activeStep: activeStep + 1,
                errors: {
                    general: message
                }
            }))
        }
    }

    handleBack = () => {
        this.setState(({ activeStep }) => ({
            activeStep: activeStep - 1,
        }))
    }

    handleReset = () => {
        this.setState({
            activeStep: 0,
        })
    }

    handleChangeClient = e => {
        const { target: { name, value } } = e
        this.setState(({ client, ...rest }) => ({
            ...rest,
            client: {
                ...client,
                [name]: value,
            }
        }))
    }

    handlerChangeNight = e => {
        const { target: { value } } = e
        if (value >= 1) {
            return this.setState(({ voucher, ...rest }) => ({
                ...rest,
                voucher: {
                    ...voucher,
                    numberNight: value,
                    price: value * rest.room.price
                }
            }))
        }
        this.setState(({ voucher, ...rest }) => ({ ...rest, voucher: { ...voucher, numberNight: 1, price: rest.room.price } }))

    }
    render() {
        const { classes } = this.props
        const { activeStep, client, room, voucher, errors } = this.state
        return (
            <Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Reservación
                    </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Fragment>
                            {activeStep === steps.length ? (
                                <Fragment>
                                    {
                                        errors.general ? (
                                            <Fragment>
                                                <Typography variant="h5" gutterBottom>
                                                    Hay un problema
                                            </Typography>
                                                <Typography variant="subtitle1">
                                                    El problema es: {errors.general}
                                                </Typography>
                                            </Fragment>
                                        ) : (
                                                <Fragment>
                                                    <Typography variant="h5" gutterBottom>
                                                        Gracias por tu orden
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        Para poder asistir a su orden debe ingresar en su perfil y presionar "Asistir",
                                                        para poder reservar otra habitación.
                                                    </Typography>
                                                </Fragment>
                                            )
                                    }
                                    <Button
                                        className={classes.button}
                                        component={Link}
                                        color="secondary"
                                        variant="outlined"
                                        to='/'
                                    >
                                        Inicio
                                    </Button>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        {getStepContent({
                                            activeStep,
                                            client,
                                            room,
                                            voucher,
                                            handleChangeClient: this.handleChangeClient,
                                            handlerChangeNight: this.handlerChangeNight
                                        })}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && (
                                                <Button onClick={this.handleBack} className={classes.button}>
                                                    Atras
                                            </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Reservar' : 'Siguiente'}
                                            </Button>
                                        </div>
                                    </Fragment>
                                )}
                        </Fragment>
                    </Paper>
                </main>
                {
                    errors.general && <Message message={errors.general} type='error' />
                }
            </Fragment>
        )
    }
}

export default withContext(withStyles(styles)(Checkout))