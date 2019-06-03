import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'
import { Avatar, Button, FormControl } from '@material-ui/core'
import { Paper, Typography, Grid, TextField } from '@material-ui/core'
import { AccountCircle, HistoryOutlined, Room } from '@material-ui/icons'
import withStyles from '@material-ui/core/styles/withStyles'
import { withContext } from '../../store/Context'
import styles from './jss/account'
class Signup extends Component {

    state = {
        updated: true,
        submmited: false,
        errors: {},
        client: {},
        defaultClient: {}
    }


    handleFormSubmit = async (e) => {

    }

    handleChange = e => {
        const { target: { name, value } } = e
        this.setState(prevState => ({
            ...prevState,
            client: {
                [name]: value
            }
        }))
    }

    componentDidMount() {
        const { Auth: { getProfile } } = this.props
        const { user_data: { person = {}, ...rest } } = getProfile()
        this.setState(prevState => ({ ...prevState, client: { ...person, ...rest, id: person.id } }))
    }

    enableUpdated = type => () => {
        const { client, defaultClient } = this.state
        if(type === 'edit') return this.setState(prevState => ({ ...prevState, updated: false, defaultClient: client }))
        this.setState(prevState => ({ ...prevState, updated: true, client: defaultClient }))
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
            }
        } = this.state
        return (
            <Fragment>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircle style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Account
                        </Typography>
                        <form className={classes.form} onSubmit={this.handleFormSubmit}>
                            <Grid spacing={24} container alignItems='center'>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.name && true}
                                        helperText={errors.name && errors.name}
                                        onChange={this.handleChange}
                                        value={name}
                                        disabled={updated}
                                        id='name'
                                        name='name'
                                        label='Nombre'
                                        fullWidth
                                        autoComplete='Nombre'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.lastName && true}
                                        helperText={errors.lastName && errors.lastName}
                                        onChange={this.handleChange}
                                        value={lastName}
                                        disabled={updated}
                                        id='lastName'
                                        name='lastName'
                                        label='Apellidos'
                                        fullWidth
                                        autoComplete='Apellidos'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.id && true}
                                        helperText={errors.id && errors.id}
                                        onChange={this.handleChange}
                                        value={id}
                                        disabled
                                        id='id'
                                        name='id'
                                        label='Cedula'
                                        fullWidth
                                        autoComplete='Cedula'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.cellphone && true}
                                        helperText={errors.cellphone && errors.cellphone}
                                        onChange={this.handleChange}
                                        value={cellphone}
                                        disabled={updated}
                                        id='cellphone'
                                        name='cellphone'
                                        label='Telefono'
                                        fullWidth
                                        autoComplete='Telefono'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.email && true}
                                        helperText={errors.email && errors.email}
                                        onChange={this.handleChange}
                                        value={email}
                                        disabled={updated}
                                        type='email'
                                        id='email'
                                        name='email'
                                        label='Correo'
                                        fullWidth
                                        autoComplete='Correo'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        error={errors.address && true}
                                        helperText={errors.address && errors.address}
                                        onChange={this.handleChange}
                                        value={address}
                                        disabled={updated}
                                        id='address'
                                        name='address'
                                        label='Dirección'
                                        fullWidth
                                        autoComplete='Dirección'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.gridButtomSubmit}>
                                    {
                                        updated ? (
                                            <Button
                                                onClick={this.enableUpdated('edit')}
                                                variant='contained'
                                                color='secondary'
                                                className={classes.submit}
                                            >
                                                Editar
                                            </Button>
                                        ) : (
                                                <Fragment>
                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        className={classes.submit}
                                                    >
                                                        Actualizar
                                                    </Button>
                                                    <Button
                                                        onClick={this.enableUpdated('update')}
                                                        variant='contained'
                                                        color='secondary'
                                                        className={classes.submit}
                                                    >
                                                        Cancelar
                                                </Button>
                                                </Fragment>
                                            )
                                    }
                                </Grid>
                            </Grid>
                            <FormControl margin='normal' fullWidth>
                            </FormControl>
                            {
                                errors.general && <Message message={errors.general} type={'error'} />
                            }
                        </form>
                    </Paper>
                </main>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <HistoryOutlined style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Historial
                        </Typography>

                    </Paper>
                </main>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Room style={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Habitaciones
                        </Typography>

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