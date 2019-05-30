import React, { Component } from 'react'
import { Page, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Table } from '../Table'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#E4E4E4'
    },
    container: {
        width: '100%', 
        alignItems: 'center'
    }
})

export default class extends Component {
    
    render() {
        const { config, changeLoading } = this.props
        return (
            <Document onRender={() => { changeLoading() }}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>
                        <Table config={config} />
                    </View>
                </Page>
            </Document>
        )
    }
}