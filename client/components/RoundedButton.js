import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RoundedButton() {
    return (
        <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.submitButton} activeOpacity={.9} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    submitButtonContainer: {
        position: "relative",
        backgroundColor: "#7EB693",
        color: "white",
        borderRadius: 50,
        width: "70%",
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        top: "5%"
    },
    submitButton: {
        position: "relative",
        color: "white",
        borderRadius: 50,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 22,
        fontFamily: "Poppins-medium",
      },
})