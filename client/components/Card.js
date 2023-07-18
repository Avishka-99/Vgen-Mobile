import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
const Card = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri:props.image}}></Image>
      <Text style={styles.productText}>{props.text}</Text>
    </View>
  )
}


export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    marginTop: "2%",
    height: 180,
    width: "90%",
    flexDirection: "row",
    shadowColor: 3,
    backgroundColor: "royalblue",
    marginLeft:"5%",
    elevation:8
    
  },
  image: {
    width: "50%",
    height: "100%",
    borderRadius: 30,
  }
  , productText: {
    paddingLeft: 12,
    fontSize: 34,
    fontFamily: "Poppins-semibold"
  }
})