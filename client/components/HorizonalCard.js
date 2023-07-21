import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

export default function HorizonalCard(props) {
    if (props.type == "store") {
        return (
            <View style={styles.StoreCardContainer}>
                <View style={styles.StoreCardContainerRow1}></View>
                <View style={styles.StoreCardContainerRow2}></View>
            </View>
        )
    } else if (props.type == "food") {
        return (
            <View style={styles.FoodCardContainer}>
                <View style={styles.FoodCardContainerRow1}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    StoreCardContainer: {
        backgroundColor: "blue",
        height: 200,
        width: Dimensions.get("screen").width / 1.1,
        marginLeft: 0,
        borderRadius: 25,
        marginBottom: 4
    },
    StoreCardContainerRow1: {
        width: "100%",
        height: "15%",
        justifyContent: "center"
    },
    StoreCardContainerRow2:{
        
    },
    Row2: {
        width: "100%",
        height: "85%",
        backgroundColor: "tomato",
        justifyContent: "center"
    },
    FoodCardContainer: {
        backgroundColor: "green",
        height: 200,
        width: Dimensions.get("screen").width / 1.1,
        marginLeft: 0,
        borderRadius: 25,
        marginBottom: 4
    },
    FoodCardContainerRow1: {
        width: "100%",
        height: "15%",
        justifyContent: "center"
    },
})