import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2,
    },
});

const Review = ({ classes, room, client, voucher }) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen de orden
            </Typography>
            <List disablePadding>
                <ListItem className={classes.listItem} key={room.id}>
                    <ListItemText primary='Habitación' secondary={`Tipo: ${room.type}, descripción: ${room.description}`} />
                    <Typography variant="body2">{room.price}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} key={room.id}>
                    <ListItemText primary='Noches' secondary={`Cantidad de noches seleccionadas`} />
                    <Typography variant="body2">{voucher.numberNights}</Typography>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {voucher.price}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Datos del cliente
                    </Typography>
                    <Typography gutterBottom>{`${client.person.name} ${client.person.lastName}` }</Typography>
                    <Typography gutterBottom>{`Dirección: ${client.address}`}</Typography>
                    <Typography gutterBottom>{`Email: ${client.email}`}</Typography>
                    <Typography gutterBottom>{`Telefonó: ${client.cellphone}`}</Typography>
                </Grid>
                
            </Grid>
        </Fragment>
    );
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);