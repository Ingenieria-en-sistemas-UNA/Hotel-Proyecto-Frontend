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
import imagenDefault from '../../../assets/img/default.png'
import { withContext } from '../../../store/Context'

const styles = {
    card: {
        maxWidth: '25%',
        margin: '10px',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
        height: 200,
    }
};

class ImgMediaCard extends Component {

    state = {}


    async componentDidMount() {
        const { Auth: { fetchImg }, img: imageName } = this.props
        try {
            const image = await fetchImg(imageName)
            this.setState({ image })
        } catch (error) {
            this.setState({ image: false })
        }
    }

    render() {
        const { classes, type, state, price, guests, description, index } = this.props,
            { image } = this.state
        return (
            <Grow in style={{ transformOrigin: '0 0 0' }} {...(index ? { timeout: 1000 * index } : { timeout: 500 })}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image={image ? URL.createObjectURL(image) : imagenDefault}
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
                                Descripción: {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Reservar
                        </Button>
                    </CardActions>
                </Card>
            </Grow>
        )
    }
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(ImgMediaCard))