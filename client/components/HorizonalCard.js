import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'

export default function HorizonalCard() {
    return (
        <View style={styles.HorizonalCardContainer}>
            <View style={styles.HorizonalCardContainerRow1}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    HorizonalCardContainer: {
        backgroundColor: "red",
        height: 200,
        width: Dimensions.get("screen").width/1.1,
        marginLeft: 0,
        borderRadius: 25,
        marginBottom:4
    },
    HorizonalCardContainerRow1: {
        width: "100%",
        height: "15%",
        justifyContent: "center"
    },
    Row2: {
        width: "100%",
        height: "85%",
        backgroundColor: "tomato",
        justifyContent: "center"
    },
})