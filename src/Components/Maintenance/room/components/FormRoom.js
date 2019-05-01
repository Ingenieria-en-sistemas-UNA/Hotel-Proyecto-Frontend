import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import {Typography, Grid, TextField, Divider, Fab} from '@material-ui/core';
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
})

class FormRoom extends Component {
    render() {
        const {classes, open, handleClose} = this.props

        return (
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <Grid container direction="row" alignContent='center'>
                    <Grid item xs={12}>
                        <DialogTitle id="max-width-dialog-title" style={{margin: '0 auto'}}>
                            <Typography>
                                Create Room
                            </Typography>
                        </DialogTitle>
                        <Divider component='hr' variant='middle'/>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogContent>
                            <form className={classes.form} noValidate>
                                <Grid spacing={24} container alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Nombre"
                                            fullWidth
                                            autoComplete="Nombre"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            label="Apellidos"
                                            fullWidth
                                            autoComplete="Apellidos"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="id"
                                            name="id"
                                            label="Cedula"
                                            fullWidth
                                            autoComplete="Cedula"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="id"
                                            name="id"
                                            label="Cedula"
                                            fullWidth
                                            autoComplete="Cedula"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Fab component='label' variant="extended" aria-label="Photo" className={classes.fab}>
                                            <input accept="image/*" className={classes.input} id="icon-button-file"
                                                   type="file"/>
                                            <PhotoCamera/>
                                            Photo
                                        </Fab>
                                    </Grid>

                                </Grid>
                            </form>
                        </DialogContent>
                    </Grid>
                    <Grid item xs={12}>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
}

FormRoom.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormRoom)