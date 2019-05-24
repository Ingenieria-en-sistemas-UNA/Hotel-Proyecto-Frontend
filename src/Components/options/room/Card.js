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
import imageDefault from '../../../assets/img/default.png'
import { withContext } from '../../../store/Context'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    card: {
        maxWidth: '25%',
        margin: '10px',
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
        height: 200,

    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

});


class ImgMediaCard extends Component {


    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    state = {}


    async componentDidMount() {
        const { Auth: { fetchImg }, img: imageName } = this.props
        try {
            const image = await fetchImg(imageName)
            this.setState({ image })
        } catch (error) {
            const image = await fetch(imageDefault).then(response => response.blob())
            this.setState({ image })
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
                            image={image && URL.createObjectURL(image)}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Habitación

                                <Typography component='p'>
                                    Tipo: {type} <br />
                                    precio: ${price} <br />
                                </Typography>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>

                                    <Typography component="p">
                                        
                                        Ocupada: {state ? "SI" : "NO"} <br />
                                        Cantidad Maxima: {guests} personas <br />
                                        Descripción: {description}
                                    </Typography>

                                </Collapse>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                        <Button size="small" color="primary">
                            Reservar
                        </Button>

                        <IconButton className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more">
                            <ExpandMoreIcon />
                        </IconButton>

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