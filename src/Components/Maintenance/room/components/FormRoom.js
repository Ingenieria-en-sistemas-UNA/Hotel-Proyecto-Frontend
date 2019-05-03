import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { Typography, Grid, TextField, Divider, Fab } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import NumberFormat from 'react-number-format'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import config from '../../../../config/config'
import { withContext } from '../../../../store/Context'

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
        margin: '0 auto',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        backgroundSize: 'contain',
        width: '300px'
    }
})


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                })
            }}
            thousandSeparator
            prefix="$"
        />
    );
}

class FormRoom extends Component {

    state = {
        state: false,
        file: false
    }

    componentDidMount() {
        const { object, itemUpdate } = this.props
        this.changeState(object, itemUpdate)
    }

    changeState = async (object, itemUpdate) => {
        if (itemUpdate) {
            const { Auth: { _checkStatus } } = this.props
            const { img, ...rest } = itemUpdate
            const file = await fetch(`${config.URL}/downloadFile/${img}`)
                .then(_checkStatus)
                .then(response => response.blob())

            return this.setState({ ...rest, file, img })

        }
        this.setState({ ...object })
    }
    componentWillReceiveProps({ object, itemUpdate }) {
        this.changeState(object, itemUpdate)
    }
    handleChangeFile = e => {
        const { files } = e.target
        const [file] = files
        this.setState(prevState => ({
            ...prevState,
            file
        }))
    }

    handleChange = e => {
        const { target: { name = 'price', value } } = e
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    handleClosePop = () => {
        const { handleClose } = this.props
        handleClose()
        this.setState({
            type: '',
            description: '',
            guests: '',
            price: '',
            file: '',
        })
    }

    handlerSubmitForm = e => {
        e.preventDefault()
        const { handlerSubmit } = this.props
        console.log(this.state)
        handlerSubmit(this.state)
    }

    render() {
        const { classes, open } = this.props
        const { type, description, guests, price, file, id = false } = this.state
        return (
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={this.handleClosePop}
                aria-labelledby="max-width-dialog-title"
                scroll='body'
            >
                <Grid container direction="row" alignContent='center'>
                    <Grid item xs={12}>
                        <DialogTitle id="max-width-dialog-title" style={{ display: 'flex' }} disableTypography>
                            <Typography align='center' variant='h5' style={{ width: '100%' }}>
                                Create Room
                            </Typography>
                        </DialogTitle>
                        <Divider component='hr' variant='middle' />
                    </Grid>
                    <form className={classes.form} onSubmit={this.handlerSubmitForm}>
                        <Grid item xs={12}>
                            <DialogContent>
                                <Grid spacing={24} container alignItems="center">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="type"
                                            name="type"
                                            label="Tipo de habitación"
                                            fullWidth
                                            autoComplete="Tipo de habitación"
                                            variant="filled"
                                            value={type}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="description"
                                            name="description"
                                            label="Descripción"
                                            fullWidth
                                            autoComplete="Descripción"
                                            variant="filled"
                                            value={description}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="guests"
                                            name="guests"
                                            label="Capacidad máxima"
                                            fullWidth
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            autoComplete="Capacidad máxima"
                                            value={guests}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="price"
                                            name="price"
                                            label="Precio"
                                            variant="filled"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                            fullWidth
                                            autoComplete="Precio"
                                            value={price}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    {
                                        file && (
                                            <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
                                                <Card className={classes.card}>
                                                    <CardMedia
                                                        className={classes.cardMedia}
                                                        image={URL.createObjectURL(file)}
                                                        title="Image Selected"
                                                    />
                                                </Card>
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12} sm={12} style={{ display: 'flex' }}>
                                        <Fab component='label' variant="extended" aria-label="Photo"
                                            className={classes.fab}>
                                            <input accept="image/*"
                                                required={!id && true}
                                                className={classes.input}
                                                id="icon-button-file"
                                                type="file"
                                                onChange={this.handleChangeFile}
                                            />
                                            <PhotoCamera />
                                            Photo
                                        </Fab>
                                    </Grid>

                                </Grid>
                            </DialogContent>
                        </Grid>
                        <Grid item xs={12}>
                            <DialogActions>
                                <Button onClick={this.handleClosePop} color="primary">
                                    Cancelar
                                </Button>
                                <Button type='submit' color="primary">
                                    Guardar
                                </Button>
                            </DialogActions>
                        </Grid>
                    </form>
                </Grid>
            </Dialog>
        )
    }
}

FormRoom.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withContext(withStyles(styles)(FormRoom))