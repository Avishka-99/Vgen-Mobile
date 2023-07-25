import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import * as Device from 'expo-device';
export default function DeliverAddress() {
    return (
        <View style={{alignItems:"center",width:"100%",height:Dimensions.get("screen").height/14,backgroundColor:"white"}}>
            <View style={styles.DeliverAddressContainer}>
                <Text style={styles.DeliverAddressDeliverTo}>Deliver to</Text>
                <Text style={styles.DeliverAddressDeliverAddress}>No 12/B,Maharagama</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    DeliverAddressContainer: {
        width: "90%",
        height:"100%",
        justifyContent:"center"
        
    },
    DeliverAddressDeliverTo: {
        fontFamily: "Poppins-regular"
    },
    DeliverAddressDeliverAddress: {
        fontFamily: "Poppins-medium"
    }
})