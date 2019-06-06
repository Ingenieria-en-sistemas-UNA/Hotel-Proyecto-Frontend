import React, { Component } from 'react'
import { Page, View, Document, StyleSheet, Text } from '@react-pdf/renderer';
import { Table } from '../Table'
import moment from 'moment'


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#ffffff'
    },
    container: {
        width: '100%',
        alignItems: 'center'
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
    }

})

export default class extends Component {

    state = { localDate: moment(new Date()).format('DD/MM/YYYY') }

    render() {

        const { localDate = '' } = this.state

        const { config, title = 'Reporte' } = this.props
        return (
            <Document >
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>

                        <Text style={styles.logo}> ATLANTIS  </Text>
                        <Text style={styles.hab}>{title}</Text>

                        <Table config={config} />
                    </View>

                    <View style={styles.date}>
                        <Text>{localDate}</Text>
                    </View>
                </Page>
            </Document>
        )
    }
}