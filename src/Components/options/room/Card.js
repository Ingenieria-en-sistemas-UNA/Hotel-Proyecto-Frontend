import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imagen from '../../../assets/img/habitacion.jpg'
import config from '../../../config/config'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
    cardContainer:{
        display: 'inline-block',
        margin: '20px'
    }
};

function ImgMediaCard(props) {
    console.log(props);
    const { classes, type, state, price, guests, img } = props;
    return (
        <Grid item xs={12} sm={6} className={classes.cardContainer}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        height="140"
                        image={ img ? `${config.URL}/downloadFile/${img}` : imagen }
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Habitación
                        </Typography>
                        <Typography component="p">
                            Tipo: { type } <br/>
                            Ocupada: { state ? "SI" : "NO" } <br/>
                            precio: ${ price } <br/>
                            Cantidad Maxima: { guests } personas
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
        </Grid>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);