import { View, Platform,Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView } from 'react-native'
import React, { useState } from 'react'


export default function SamaryCard(){
    return(
        <View style={styles.cardFrame}>

        </View>
    )
}

const styles =StyleSheet.create({
    cardFrame:{
        width:Platform.OS=="android"?Dimensions.get("screen").width/5:Dimensions.get("screen")/4,
        height:"40%",
        backgroundColor:'red'
    }
}) 