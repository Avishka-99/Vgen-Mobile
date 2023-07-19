import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
const Card = (props) => {
  return (
    <View style={styles.container}>
      <Text>Outer</Text>
      <View styles={styles.imageContainer}>
        <Text>Inner</Text>
      </View>
    </View>
  )
}


export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    height: 200,
    width: 140,
    flexDirection: "column",
    marginLeft: "5%",
    backgroundColor: "yellow",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute"
  },
  imageContainer: {
    width: 140,
    height: 100,
    backgroundColor: "green"
  },
})