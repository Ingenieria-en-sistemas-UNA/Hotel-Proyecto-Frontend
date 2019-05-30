import React from 'react'
import { View } from '@react-pdf/renderer'
import Row from './Row'
import Column from './Column'
import Cell from './Cell'


const getColumnText = (item, key, columsConfig) => {
    if (!columsConfig[key]) return item[key]
    if (!columsConfig[key].isBoolean) return columsConfig[key].customText
    if (item[key]) {
        return columsConfig[key].ifTrue
    }
    return columsConfig[key].ifFalse
}

export default ({ column, data }) => {
    const orderKey = column ? Object.keys(column) : []
    return (
        <View>
            {
                data.map((item) => {
                    return (
                        <Row key={item.id}>
                            {
                                orderKey.map((key, i) => {
                                    return (
                                        <Column key={i} color={'#fff'}>
                                            <Cell>
                                                {getColumnText(item, key, column)}
                                            </Cell>
                                        </Column>
                                    )
                                })
                            }
                        </Row>
                    )
                })
            }
        </View>
    )
}