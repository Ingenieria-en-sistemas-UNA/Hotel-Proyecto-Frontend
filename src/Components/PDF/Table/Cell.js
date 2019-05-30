import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    cell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 10
    }
})

export default ({ children }) =>
    <View style={styles.cell}>
        <Text>{ children }</Text>
    </View>
