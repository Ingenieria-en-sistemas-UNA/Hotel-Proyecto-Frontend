import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grow from '@material-ui/core/Grow'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imagen from '../../../assets/img/habitacion.jpg'
import config from '../../../config/config'
import { withContext } from '../../../store/Context'

const styles = {
    card: {
        maxWidth: '25%',
        margin: '20px'
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    }
};

class ImgMediaCard extends Component {

    state = {}


    async componentDidMount() {
        const { Auth: { _checkStatus }, img } = this.props
        const image = await fetch(`${config.URL}/downloadFile/${img}`)
            .then(_checkStatus)
            .then(response => response.blob())

        this.setState({ image })
    }

    render() {
        const { classes, type, state, price, guests, description, index } = this.props,
            { image } = this.state
        return (
            image ? (<Grow in style={{ transformOrigin: '0 0 0' }} {...(index ? { timeout: 1000 * index } : { timeout: 500 } )}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image={image ? URL.createObjectURL(image) : imagen}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Habitación
                            </Typography>
                            <Typography component="p">
                                Tipo: {type} <br />
                                Ocupada: {state ? "SI" : "NO"} <br />
                                precio: ${price} <br />
                                Cantidad Maxima: {guests} personas <br />
                                Descripción: { description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grow>)
                : null
        )
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(ImgMediaCard))