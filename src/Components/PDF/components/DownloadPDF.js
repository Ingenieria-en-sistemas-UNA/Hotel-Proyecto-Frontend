import React from 'react'
import { BlobProvider } from '@react-pdf/renderer';

export default ({ PDF, filename = 'Reporte-Atlantis' }) =>
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
                console.log(blob, url, loading, error)
            }
            return ''
        }}
    </BlobProvider>