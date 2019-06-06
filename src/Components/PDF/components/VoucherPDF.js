import React, { Component } from 'react'
import { Page, View, Document, StyleSheet, Text } from '@react-pdf/renderer';
import moment from 'moment'


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#ffffff'
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    date: {
        fontSize: 12,
        textAlign: 'right',
        padding: '30',
    },
    logo: {
        width: '100%',
        fontSize: 24,
        textAlign: 'left',
        color: '#3f51b5',
        marginTop: '30',
        padding: '15',
    },
    hab: {
        fontSize: 20,
        textAlingn: 'left',
        color: '#0000',
        padding: '15',
    },
    title: {
        fontSize: 15,
        textAlingn: 'left',
        color: '#0000',
        padding: '15',
    },
    text: {
        margin: 5
    },
    box: {
        width: '75%',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '10 20 15 20',
        border: '1 solid lightgrey',
        borderRadius: '3'
    }

})

export default class extends Component {

    state = { localDate: moment(new Date()).format('DD/MM/YYYY') }

    render() {

        const { localDate = '' } = this.state

        const { reserve: { room, client, voucher, localDate: reserveDate }, title = 'Factura de Reserva' } = this.props
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>
                        <Text style={styles.logo}>ATLANTIS</Text>
                        <Text style={styles.hab}>{title}</Text>
                        <View style={styles.box}>
                            <Text style={styles.title} >Detalles</Text>
                            <Text style={styles.text} >Habitacion: {room.type}</Text>
                            <Text style={styles.text} >Precio de habitación: {room.price}</Text>
                            <Text style={styles.text} >Cantidad de noches: {voucher.numberNight + ''} </Text>
                            <Text style={styles.text} >Total: {voucher.price + ''}</Text>
                            <Text>Fecha de reserva: {reserveDate}</Text>
                            <View style={styles.box}>
                                <Text style={styles.title} >Datos Cliente</Text>
                                <Text style={styles.text} >Nombre: {client.person.name}</Text>
                                <Text style={styles.text} >Apellido: {client.person.lastName}</Text>
                                <Text style={styles.text} >Telefono: {client.cellphone}</Text>
                                <Text style={styles.text} >Dirección: {client.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.date}>
                        <Text>{localDate}</Text>
                    </View>
                </Page>
            </Document>
        )
    }
}