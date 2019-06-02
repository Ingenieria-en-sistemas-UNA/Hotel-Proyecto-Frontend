import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    row: {
        margin: 'auto',
        flexDirection: 'row',
        width: '100%',
    }
})

export default ({ children }) =>
    <View style={styles.row}>
        { children }
    </View>