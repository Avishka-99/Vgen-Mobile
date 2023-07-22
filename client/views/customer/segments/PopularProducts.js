import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import VerticalCard from '../../../components/VerticalCard'
import HorizonalCard from '../../../components/Card'
export default function PopularProducts() {
  return (
    <View style={styles.ProductContainer}>
      <View style={styles.ProductContainerRow1}>
        <Text style={styles.title}>Most Popular Meals</Text>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={{ alignItems: "center", justifyContent: "center", }} style={styles.ProductContainerRow2}>
        <HorizonalCard />
      </ScrollView>
      {/* image="http://10.22.164.207/Vgen-Server/uploads/products/1689663179295.jpeg" */}
    </View>
  )
}

const styles = StyleSheet.create({
  ProductContainer: {
    backgroundColor: "gray",
    height: Dimensions.get("screen").height / 3,
    width: Dimensions.get("screen").width / 1.1,
    marginBottom: 5,

  },
  ProductContainerRow1: {
    width: "100%",
    height: "15%",
    backgroundColor: "dodgerblue",
    justifyContent: "center"
  },
  ProductContainerRow2: {
    width: "100%",
    height: "85%",
    backgroundColor: "gray",

  },
  title: {
    fontFamily: "Poppins-semibold",
    fontSize: 15,
    paddingLeft: 4

  }
})