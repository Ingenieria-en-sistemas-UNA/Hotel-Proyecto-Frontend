import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

export default ({ client: { person: { name = '', lastName = '' }, address = '', cellphone = '', email = '' }, handleChangeClient }) => {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Confirmación de datos
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Nombre"
                        value={name}
                        disabled
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Apellidos"
                        value={lastName}
                        disabled
                        fullWidth
                        autoComplete="lname"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Dirección"
                        onChange={handleChangeClient}
                        value={address}
                        fullWidth
                        autoComplete="billing address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="cellphone"
                        name="cellphone"
                        label="Telefonó"
                        onChange={handleChangeClient}
                        value={cellphone}
                        fullWidth
                        autoComplete="billing address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChangeClient}
                        value={email}
                        label="Correo Electrónico"
                        fullWidth
                        autoComplete="billing address-level2"
                    />
                </Grid>
            </Grid>
        </Fragment>
    )
}