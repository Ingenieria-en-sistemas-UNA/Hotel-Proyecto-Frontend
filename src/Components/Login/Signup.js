import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from '../Message'
import { Avatar, Button, FormControl } from '@material-ui/core';
import { Paper, Typography, Link, Grid, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withContext } from '../../store/Context'
import styles from './jss/signup'
import validate from './validate/signup'
class Signup extends Component {

    state = {
        roles: ["ROLE_CLIENT"],
        errors: {}
    };

    componentWillMount() {
        const { Auth, history } = this.props;
        if (Auth.loggedIn()) {
            history.push('/');
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault();
        const { errors, ...sinErrors } = this.state;
        const { changeSessionState, Auth, history } = this.props;
        const result = validate(sinErrors);
        if (!Object.keys(result).length) {
            try {
                const user = this.getUser(sinErrors);
                await Auth.Signup(user);
                changeSessionState(true);
                history.push('/');
            } catch ({ message }) {
                this.setState({
                    errors: { general: message },
                })
            }
        } else {
            this.setState({ errors: result })
        }
    };

    getUser = ({roles, username, password, ...client}) => {
        const { address, cellphone, email, ...person } = client;
        return {
            roles,
            username,
            password,
            client: {
                address,
                cellphone,
                email,
                person
            }
        }
    };

    login = () => {
        const { history } = this.props;
        history.push('/login')
    };

    handleChange = e => {
        const { target: { name, value } } = e;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };
    render() {
        const { classes } = this.props;
        const {
            errors, name = '', lastName = '', id = '',
            cellphone = '', email = '', address = '', username = '', password= '' } = this.state;

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleFormSubmit}>
                        <Grid spacing={24} container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errors.name && true}
                                    helperText={errors.name && errors.name}
                                    value={name}
                                    onChange={this.handleChange}
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
                                    value={lastName}
                                    onChange={this.handleChange}
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
                                    value={id}
                                    onChange={this.handleChange}
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
                                    value={cellphone}
                                    onChange={this.handleChange}
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
                                    value={email}
                                    onChange={this.handleChange}
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
                                    value={address}
                                    onChange={this.handleChange}
                                    id="address"
                                    name="address"
                                    label="Dirección"
                                    fullWidth
                                    autoComplete="Dirección"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errors.username && true}
                                    helperText={errors.username && errors.username}
                                    value={username}
                                    onChange={this.handleChange}
                                    id="username"
                                    name="username"
                                    label="Nombre de usuario"
                                    fullWidth
                                    autoComplete="Nombre de usuario"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={errors.password && true}
                                    helperText={errors.password && errors.password}
                                    value={password}
                                    onChange={this.handleChange}
                                    type="password"
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    fullWidth
                                    autoComplete="Contraseña"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridButtomSubmit}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign up
                                </Button>
                            </Grid>
                        </Grid>
                        <FormControl margin="normal" fullWidth>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={this.login}
                            >
                                ¿Ya tienes cuenta? Iniciá Sesión
                            </Link>
                        </FormControl>
                        {
                            errors.general && <Message message={errors.general} type={"error"} />
                        }
                    </form>
                </Paper>
            </main>
        )
    }
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(Signup))