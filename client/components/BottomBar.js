import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function BottomBar() {
    return (
        <View style={styles.bar}>
            <Text>bottomBar</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    bar: {
        flex:1,
        width: "100%",
        backgroundColor:"red"

    }
})