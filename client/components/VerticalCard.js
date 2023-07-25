import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
const VerticalCard = (props) => {
  
  return (
    <View style={styles.CardContainer}>
      <View style={styles.CardContainerRow1}></View>
    </View>
  )
}


export default VerticalCard

const styles = StyleSheet.create({
  CardContainer: {
    backgroundColor: "red",
    height: 200,
    width: 130,
    marginLeft:13,
    borderRadius:10
  },
  CardContainerRow1: {
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