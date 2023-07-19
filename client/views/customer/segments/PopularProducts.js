import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Card from '../../../components/Card'
export default function PopularProducts() {
  return (
    <View style={styles.Container}>
      <View style={styles.Row1}>
        <Text style={styles.title}>Most Popular Meals</Text>
      </View>
      <View>
        <Card image="http://10.22.164.207/Vgen-Server/uploads/1689663179295.jpeg" />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "red",
    height: Dimensions.get("screen").height / 3,
    width: Dimensions.get("screen").width / 1.1,
    marginBottom: 5,
  },
  Row1: {
    width: "100%",
    height: "20%",
    backgroundColor: "dodgerblue",
    justifyContent: "center"
  },
  title: {
    fontFamily: "Poppins-semibold",
    fontSize: 15,
    paddingLeft: 4

  }
})