import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer';
import Header from './Header'
import Body from './Body'

const styles = StyleSheet.create({
    table: {
        display: 'table',
        width: '85%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    }
})

export default ({ config: { data, column, rows } }) => 
    <View style={styles.table}>
        <Header rows={rows} column={column} />
        <Body column={column} data={data} />
    </View>
