import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import img from '../assets/img/home.jpg'
import { HotelContext } from '../store/Context'
const styles = theme => ({
    card: {
        maxWidth: '100%',
        padding: '10px 30px 30px 30px',
        textAlign: 'center'
    },
    media: {
        width: '100%'
    },
});

class Loggin extends Component {
    static contextType = HotelContext;
    render() {
        const { classes } = this.props;
        return (
            <Grid item style={{ width: '100%' }}>
                <Card className={classes.card}>
                    <CardHeader
                        title="Hotel"
                    />
                    <CardMedia component="img" src={img} className={classes.media} />
                </Card>
            </Grid>
        )
    }
}

export default withStyles(styles)(Loggin)
