import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import NumberFormatCustom from '../utils/NumberFormatCustom'

export default ({ voucher: { price, numberNights, detail }, room: { description = '', guests = '', type = '' }, handlerChangeNight }) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Datos de habitación
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="type"
                        name="type"
                        label="Tipo de habitación"
                        value={type}
                        disabled
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="guests"
                        name="guests"
                        label="Cantidad maximá de huespedes"
                        value={guests}
                        disabled
                        fullWidth
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        name="description"
                        label="Dirección"
                        value={description}
                        disabled
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="numberNights"
                        name="numberNights"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        type="number"
                        onChange={handlerChangeNight}
                        value={numberNights}
                        label="Cantidad de noches a reservar"
                        fullWidth
                        autoComplete="billing address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="price"
                        name="price"
                        label="Precio total de la reserva"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        fullWidth
                        disabled
                        autoComplete="Precio"
                        value={price}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="detail"
                        name="detail"
                        label="Detalle de habitación"
                        value={detail}
                        disabled
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}