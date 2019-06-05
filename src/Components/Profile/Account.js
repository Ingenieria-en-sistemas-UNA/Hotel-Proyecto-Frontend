import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Message from '../Message'
import { Avatar, Button, FormControl } from '@material-ui/core'
import { Paper, Typography, Grid, TextField } from '@material-ui/core'
import { AccountCircle, HistoryOutlined, Room } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'
import { withContext } from '../../store/Context'
import Card from '../card/Card'
import styles from './jss/account'
import config from '../../config/config'
class Signup extends Component {

    state = {
        updated: true,
        submmited: false,
        errors: {},
        client: {},
        history: [],
        reserves: []
    }


    handleFormSubmit = async (e) => {

    }

    handleChange = e => {
        const { target: { name, value } } = e
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    componentDidMount() {
        const { Auth: { getProfile } } = this.props
        const { user_data: { person = {}, ...rest } } = getProfile()
        this.setState(prevState => ({
            ...prevState,
            client: { ...person, ...rest, id: person.id },
        }))
        this.refreshReserveAccount()
    }

    refreshReserveAccount = async (id) => {
        const { Auth: { getProfile, fetch: fetchAPI } } = this.props
        const { user_data } = getProfile()
        const reserves = await fetchAPI(`${config.URL}/reserve/client/${user_data.id}`)
        this.setState(prevState => ({
            ...prevState,
            history: this.getHistory(reserves, id),
            reserves: this.getCurrentReserves(reserves, id)
        }))
    }

    getHistory = (reserves, id = '') => {
        let array = []
        reserves.forEach((reserve = { room: { client: {} } }) => {
            if (!reserve.alive) {
                array = this.addToArray(array, reserve)
            }
        })
        return array
    }

    addToArray = (array, value) => {
        return [...array, value]
    }

    getCurrentReserves = (reserves, id) => {
        let array = []
        reserves.forEach(reserve => {
            if (reserve.alive) {
                array = this.addToArray(array, reserve)
            }
        })
        return array
    }

    enableUpdated = () => {
        this.setState(prevState => ({ ...prevState, updated: !prevState.updated }))
    }

    handlerAsistRoom = ({ idReserve }) => async () => {
        const { Auth: { fetch: fetchAPI } } = this.props
        try {
            const reserve = this.getReserve(idReserve)
            const response = await fetchAPI(`${config.URL}/reserve/unreserve`, {
                method: 'PUT',
                body: JSON.stringify(reserve)
            })
            console.log(response)
            this.refreshReserveAccount()
        } catch ({ message }) {
            console.log(message)
        }
    }

    getReserve = id => {
        const { reserves = [] } = this.state
        let object = {}
        reserves.forEach(reserve => {
            if (reserve.id === id) {
                object = reserve
            }
        })
        return object
    }

    render() {
        const { classes } = this.props
        const {
            updated,
            submmited,
            errors,
            client: {
                id = '',
                name = '',
                lastName = '',
                cellphone = '',
                address = '',
                email = ''
            },
            reserves
        } = this.state
        return (
            <Fragment>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircle style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Account
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleFormSubmit}>
                            <Grid spacing={24} container alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.name && true}
                                        helperText={errors.name && errors.name}
                                        onChange={this.handleChange}
                                        value={name}
                                        disabled={updated}
                                        id="name"
                                        name="name"
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="Nombre"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.lastName && true}
                                        helperText={errors.lastName && errors.lastName}
                                        onChange={this.handleChange}
                                        value={lastName}
                                        disabled={updated}
                                        id="lastName"
                                        name="lastName"
                                        label="Apellidos"
                                        fullWidth
                                        autoComplete="Apellidos"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.id && true}
                                        helperText={errors.id && errors.id}
                                        onChange={this.handleChange}
                                        value={id}
                                        disabled
                                        id="id"
                                        name="id"
                                        label="Cedula"
                                        fullWidth
                                        autoComplete="Cedula"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.cellphone && true}
                                        helperText={errors.cellphone && errors.cellphone}
                                        onChange={this.handleChange}
                                        value={cellphone}
                                        disabled={updated}
                                        id="cellphone"
                                        name="cellphone"
                                        label="Telefono"
                                        fullWidth
                                        autoComplete="Telefono"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.email && true}
                                        helperText={errors.email && errors.email}
                                        onChange={this.handleChange}
                                        value={email}
                                        disabled={updated}
                                        type="email"
                                        id="email"
                                        name="email"
                                        label="Correo"
                                        fullWidth
                                        autoComplete="Correo"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.address && true}
                                        helperText={errors.address && errors.address}
                                        onChange={this.handleChange}
                                        value={address}
                                        disabled={updated}
                                        id="address"
                                        name="address"
                                        label="Dirección"
                                        fullWidth
                                        autoComplete="Dirección"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.gridButtomSubmit}>
                                    <Button
                                        onClick={this.enableUpdated}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={submmited}
                                        className={classes.submit}
                                    >
                                        Actualizar
                                    </Button>
                                </Grid>
                            </Grid>
                            <FormControl margin="normal" fullWidth>
                            </FormControl>
                            {
                                errors.general && <Message message={errors.general} type={"error"} />
                            }
                        </form>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <HistoryOutlined style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Historial
                        </Typography>

                    </Paper>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Room style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reservaciones Actuales
                        </Typography>
                        <Grid container justify='space-around' direction='row' wrap='wrap' style={{ display: 'flex', alignItems: 'flex-start' }}>
                            {
                                reserves.length ? (reserves.map(({ room, id }, index) =>
                                    <Card
                                        key={room.id}
                                        room={{ ...room, idReserve: id }}
                                        index={index}
                                        account
                                        handlerAsistRoom={this.handlerAsistRoom}
                                    />
                                )
                                ) : ''
                            }
                            {
                                !reserves.length && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        component={Link}
                                        to='/rooms'
                                    >
                                        Ir a reservar
                                    </Button>
                                )
                            }
                        </Grid>
                    </Paper>
                </main>
            </Fragment>
        )
    }
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withContext(withStyles(styles)(Signup))