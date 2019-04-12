import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../auth/AuthService'
import Message from '../../Components/Message'
import { Avatar, Button, FormControl } from '@material-ui/core';
import { Input, InputLabel, Paper, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { withContext } from '../../store/Context'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Signup extends Component {
    constructor() {
        super()
        this.Auth = new AuthService();
    }

    state = {}

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.history.push('/');
        }
    }

    handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await this.Auth.Signup(this.state)
            const { changeSesionState } = this.props
            console.log(response)
            changeSesionState(true)
            this.props.history.push('/');
        } catch ({message}) {
            this.setState({ 
                error: true,
                message
            })
        }
    }

    login = () => {
        const { history } = this.props
        history.push('/login')
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
        const { error, message  } = this.state

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
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username" error={error && true}>Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password" error={error && true}>Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email" error={error && true}>Email</InputLabel>
                            <Input
                                name="email"
                                type="email"
                                id="email"
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
                            Sign up
                        </Button>
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
                            error && <Message message={message} type={"error"}/>
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