import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    col: (color, cant = 5 ) => ({
        width: `${100/cant}%`,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: color,
        margin: 0,
        padding: '5px 0 5px 0'
    })
});

export default ({ children, color, cant }) =>
    <View style={styles.col(color, cant)}>
        { children }
    </View>