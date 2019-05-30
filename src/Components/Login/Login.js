import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'
import { Avatar, Button, FormControl } from '@material-ui/core'
import { Input, InputLabel, Paper, Typography, Link, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { withContext } from '../../store/Context'
import styles from './jss/login'

class Login extends Component {

    state = {
        errors: {}
    }

    componentWillMount() {
        const { Auth: { loggedIn }, history } = this.props
        if (loggedIn()) {
            history.push('/')
        }
    }

    handleFormSubmit = async (e) => {
        e.preventDefault()
        try {

            const { changeSessionState, history, Auth: { login } } = this.props
            await login(this.state.username, this.state.password)
            changeSessionState(true)
            history.push('/')

        } catch ({ message }) {
            this.setState({
                errors: { 
                    general: message,
                    credentials: true
                }
            })

            setTimeout(() => {
                this.setState(({errors}) =>({ 
                    errors: {
                        ...errors,
                        general: false
                    }
                }))
            }, 6000)

        }
    }

    signup = () => {
        const { history } = this.props
        history.push('/signup')
    }

    handleChange = e => {
        const { target: { name, value } } = e
        this.setState({
            [name]: value,
            error: false
        })
    }
    render() {
        const { classes } = this.props
        const { errors } = this.state
        return (
            <Grid item className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleFormSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username" error={errors.credentials && true}>Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password" error={errors.credentials && true}>Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                        <FormControl margin="normal" fullWidth>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={this.signup}
                            >
                                ¿Aún no tienes cuenta? Registrate
                            </Link>
                        </FormControl>
                        {
                            errors.general && <Message message={errors.general} type={"error"} />
                        }
                    </form>
                </Paper>
            </Grid>
        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withContext(withStyles(styles)(Login))