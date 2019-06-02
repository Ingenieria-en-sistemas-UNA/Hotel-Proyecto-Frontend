import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { withContext } from '../../store/Context'
import config from '../../config/config'
import PDF from './components/RoomPDF'

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
class RoomPDF extends React.Component {

    state = {
        rooms: [],
        LOADING: true
    }

    changeLoading = () => this.setState(prevState => ({ ...prevState, LOADING: false }))

    async componentDidMount() {
        const { Auth: { fetch: fetchAPI } } = this.props
        const rooms = await fetchAPI(`${config.URL}/room?filter=all`)
        this.setState(prevState => ({ ...prevState, rooms }))

    
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.state.LOADING
    }

    render() {
        const { rooms: data } = this.state
        const config = { data, ...configTable }
        return (
            config && (
                <PDFViewer width={'100%'} height={600}>
                    <PDF config={config} changeLoading={this.changeLoading}/>
                </PDFViewer>
            )
        )
    }
    // render() {
    //     const { rooms: data } = this.state
    //     const config = { data, ...configTable }
    //     return (
    //         <PDFDownloadLink document={<PDF config={config} changeLoading={this.changeLoading}/>} fileName="room.pdf" >
    //             {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    //         </PDFDownloadLink>
    //     )
    // }
}

export default withContext(RoomPDF)