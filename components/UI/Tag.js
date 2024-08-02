import React from "react";
import { Text, StyleSheet } from "react-native";

const Tag = props => {

    return (
        <Text style={[ styles.tag, styles[`${props.level}`] ]}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    tag: {
        paddingLeft: 6,
        paddingRight: 6,
        fontSize: 12,
        fontFamily: 'rubik',
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#333',
        borderRadius: 100,
        // fontWeight: 600,
        
    },
    easy: {
        backgroundColor: '#51cf66',
    },
    medium: {
        backgroundColor: '#ffd43b',
    },
    hard: {
        backgroundColor: '#ff00008f',
    },
    Finished: {
        backgroundColor: "#f77f7f8f",
    },
    IsRecurring: {
        backgroundColor: "#96c79f",
    },
    NotStartedYet: {
        backgroundColor: "#fde693",
    },
    
})


export default Tag;