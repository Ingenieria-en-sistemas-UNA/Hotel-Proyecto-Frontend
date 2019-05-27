import React from 'react';
import { Page, View, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { withContext } from '../../store/Context'
import config from '../../config/config'
import { Table } from './Table'
// Create styles

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

const configTable = {
    rows: [
        { id: 'type', label: 'Tipo' },
        { id: 'state', label: 'Estado de habitación' },
        { id: 'price', label: 'Precio' },
        { id: 'guests', label: 'Capacidad' }
    ],
    column: {
        type: false,
        state: { isBoolean: true, ifTrue: 'Ocupado', ifFalse: 'Disponible', customText: '' },
        price: false,
        guests: false,
    }
}

// Create Document Component
class Sample extends React.Component {

    state = {
        LOADING: true,
        rooms: []
    }

    async componentDidMount() {
        const { Auth: { fetch: fetchAPI } } = this.props
        const rooms = await fetchAPI(`${config.URL}/room?filter=all`)
        this.setState(prevState => ({ ...prevState, rooms }))
    }

    createDocument = () => {
        const { rooms: data } = this.state
        const config = { data, ...configTable}

        return (
            <Document onRender={() => { this.state.LOADING = false; }}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.container}>
                        <Table config={config} />
                    </View>
                </Page>
            </Document>)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.state.LOADING
    }
    render() {
        return <PDFViewer width={'100%'} height={600}>{this.createDocument()}</PDFViewer>
    }
    // render() {
    //     return (
    //         <PDFDownloadLink document={this.createDocument()} fileName="somename.pdf" >
    //             {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    //         </PDFDownloadLink>
    //     )
    // }
}

export default withContext(Sample)