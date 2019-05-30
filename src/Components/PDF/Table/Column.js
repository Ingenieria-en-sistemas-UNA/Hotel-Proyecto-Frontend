import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    col: color => ({
        width: "25%",
        borderStyle:
            "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: '10px 20px 10px 20px',
        backgroundColor: color,
        margin: 0
    })
});

export default ({ children, color }) =>
    <View style={styles.col(color)}>
        { children }
    </View>