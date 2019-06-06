import React, { Component } from 'react'
import { BlobProvider } from '@react-pdf/renderer';
export default class extends Component {
    state = { is_Mounted: true }
    
    componentWillReceiveProps({ config: { data: dataNext = [] } }) {
        const { config: { data: dataPrev = [] } } = this.props
        if (!this.isTheSame(dataPrev, dataNext)) {
            this.setState({ is_Mounted: true })
        }else {
            this.setState({ is_Mounted: false })
        }
    }

    isTheSame = (dataPrev = [], dataNext = []) => {
        let theSame = false
        dataPrev.forEach(prev => {
            dataNext.forEach(next => {
                if( prev === next){
                    theSame = true
                }else{
                    theSame = false
                }    
            })
        })
        return theSame
    }

    render() {
        const { PDF, filename = 'Reporte-Atlantis' } = this.props
        const { is_Mounted } = this.state
        return (
            is_Mounted ? (
                <BlobProvider document={PDF} >
                    {({ blob, url, loading, error }) => {
                        if (blob !== null) {
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(blob);
                                return '';
                            }
                            const data = window.URL.createObjectURL(blob)
                            const link = document.createElement('a')
                            link.href = data
                            link.download = filename
                            link.click()
                            setTimeout(() => {
                                window.URL.revokeObjectURL(data)
                            }, 100)
                        }
                        return ''
                    }}
                </BlobProvider>
            ) : ''
        )
    }
} 