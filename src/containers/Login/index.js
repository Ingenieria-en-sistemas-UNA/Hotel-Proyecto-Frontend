import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from '../../auth/AuthService'
import Message from '../../Message'
import { Avatar, Button, CssBaseline, FormControl, FormControlLabel, Checkbox  } from '@material-ui/core';
import { Input, InputLabel, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';

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

class Login extends Component {
    constructor() {
        super()
        this.Auth = new AuthService();
        this.Auth.refrech()
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
            const response = await this.Auth.login(this.state.username, this.state.password)
            console.log(response)
            this.props.history.push('/');
        } catch ({message}) {
            this.setState({ 
                error: true,
                message
            })
        }
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
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign in
                        </Button>
                        {
                            error && <Message message={message} type={"error"}/>
                        }
                    </form>
                </Paper>
            </main>
        )
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);