import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { withContext } from '../../store/Context'
import { Link } from 'react-router-dom'

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 5}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 5
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const Home = props => {
    const { classes, Auth: { loggedIn } } = props;
    return (
        <Fragment>
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        ATLANTIS
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Magna culpa fugiat elit in sit irure. Ullamco cillum officia anim cupidatat aute sint pariatur sit sunt ea nostrud officia. 
                        Sit magna tempor nostrud est aliquip cillum aliquip incididunt aliquip dolor ut duis.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={16} justify="center">
                            <Grid item>
                                {
                                    loggedIn() ? (
                                        <Button variant="contained" color="primary" component={Link} to="/rooms">
                                            Reservar
                                        </Button>
                                    ) : (
                                            <Button variant="contained" color="primary" component={Link} to="/signup">
                                                Registrate
                                        </Button>
                                        )
                                }
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="secondary" component={Link} to="/contact">
                                    Contactenos
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
                {/* End hero unit */}
                <Grid container spacing={40}>
                    {cards.map(card => (
                        <Grid item key={card} sm={6} md={4} lg={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={require(`../../assets/img/home/${card}.jpg`)}
                                    title="Hotel"
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Fragment>
    )
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withContext(withStyles(styles)(Home))