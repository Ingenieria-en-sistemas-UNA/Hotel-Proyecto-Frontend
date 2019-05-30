import React from 'react'
import { View } from '@react-pdf/renderer'
import Row from './Row'
import Column from './Column'
import Cell from './Cell'

export default ({ rows }) =>
    <View>
        <Row>
            {
                rows.map((row) => {
                    return (
                        <Column key={row.id} color={'#3f51b5'}>
                            <Cell>
                                {row.label}
                            </Cell>
                        </Column>
                    )
                })
            }
        </Row>
    </View>