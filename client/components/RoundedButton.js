import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RoundedButton(props) {
    const styles = StyleSheet.create({
        Container: {
            position: "relative",
            backgroundColor: props.color,
            color: "white",
            borderRadius: 50,
            width: "70%",
            height: "12%",
            justifyContent: "center",
            alignItems: "center",
            top: "5%"
        },
        Button: {
            position: "relative",
            color: "white",
            borderRadius: 50,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        Text: {
            color: "white",
            fontSize: 22,
            fontFamily: "Poppins-medium",
          },
    })
    return (
        <View style={styles.Container}>
            <TouchableOpacity style={styles.Button} activeOpacity={.9} onPress={() => props.function()}>
                <Text style={styles.Text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
    
}

