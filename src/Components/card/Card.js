import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grow from '@material-ui/core/Grow'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import imageDefault from '../../assets/img/default.png'
import { withContext } from '../../store/Context'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import classnames from 'classnames'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { FiberManualRecord } from '@material-ui/icons'
import styles from './jss/styles'
import DownloadPDF from '../PDF/components/DownloadPDF'
import PDF from '../PDF/components/VoucherPDF'

class ImgMediaCard extends Component {


    state = {
        expanded: false
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }))
    }

    async componentDidMount() {
        const { Auth: { fetchImg }, room: { img: imageName } } = this.props
        try {
            const image = await fetchImg(imageName)
            this.setState({ image })
        } catch (error) {
            const image = await fetch(imageDefault).then(response => response.blob())
            this.setState({ image })
        }
    }

    getDefaultImage = async () => {
        return await fetch(imageDefault).then(response => response.blob())
    }

    handlerVoucher = reserve => () => {
        this.setState(prevState => ({ ...prevState, downloading: reserve }))
    }

    render() {
        const { classes, room, index, handlerReserveRoomValidate, account = false, handlerAsistRoom } = this.props
        const { image, downloading = false } = this.state
        const { type, state, price, guests, description } = room
        return (
            <Fragment>
                <Grow in style={{ transformOrigin: '0 0 0' }} {...(index ? { timeout: 1000 * index } : { timeout: 500 })}>
                    <Card className={classes.card}>
                        <CardActionArea onClick={this.handleExpandClick} >
                            <CardMedia
                                component='img'
                                alt='Contemplative Reptile'
                                className={classes.media}
                                height='140'
                                image={image ? URL.createObjectURL(image) : require('../../assets/img/default.png')}
                                title='Contemplative Reptile'
                            />
                            <CardContent>
                                {
                                    !account && (
                                        <Typography align='right' >
                                            <FiberManualRecord style={state ? { color: '#f44336' } : { color: '#00c853' }} />
                                        </Typography>
                                    )
                                }
                                <Typography gutterBottom variant='h5' component='h2'>
                                    Habitación

                                        <Typography component='p'>
                                        Tipo: {type} <br />
                                        precio: ${price} <br />
                                    </Typography>
                                    <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>

                                        <Typography component='p'>
                                            Cantidad Maxima: {guests} personas <br />
                                            Descripción: {description} <br />
                                            {!account && (`Ocupada: ${state ? 'SI' : 'NO'}`)}<br />
                                        </Typography>

                                    </Collapse>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Divider variant='middle' />
                        <CardActions>
                            {
                                account ? (
                                    <Fragment>
                                        <Button variant='outlined' size='small' color='secondary' onClick={handlerAsistRoom(room)} >
                                            Asistir
                                        </Button>
                                        <Button style={{ marginLeft: 5 }} variant='outlined' size='small' color='secondary' onClick={this.handlerVoucher(room.reserve)} >
                                            Factura
                                        </Button>
                                    </Fragment>
                                ) : (
                                        <Button disabled={state} variant='outlined' size='small' color='primary' onClick={handlerReserveRoomValidate(room)} >
                                            Reservar
                                        </Button>
                                    )
                            }

                            <IconButton className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                                aria-label='Show more'>
                                <ExpandMoreIcon />
                            </IconButton>

                        </CardActions>
                    </Card>
                </Grow>
                {
                    downloading && (
                        <DownloadPDF
                            PDF={<PDF reserve={downloading} title='Factura de Reserva' />}
                            filename={`Factura-${downloading.id}-${downloading.localDate.replace('/', '-')}`}
                            config={{ config: { data: [downloading] } }}
                        />
                    )
                }
            </Fragment>
        )
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withContext(withStyles(styles)(ImgMediaCard))