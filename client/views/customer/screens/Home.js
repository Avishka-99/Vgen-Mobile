import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, StatusBar } from 'react-native'
import React from 'react'
import Card from '../../../components/Card'
import { FlashList } from "@shopify/flash-list";

export default function Home() {
  const imageNames = [
    {
      id: 1, image: '../assets/products/1.jpeg'
    },
    {
      id: 2, image: '../assets/products/2.jpeg'
    },
    {
      id: 3, image: '../assets/products/3.jpeg'
    },
    {
      id: 4, image: '../assets/products/3.jpeg'
    },
    {
      id: 5, image: '../assets/products/3.jpeg'
    },
    {
      id: 6, image: '../assets/products/3.jpeg'
    },
  ]
  const styles = StyleSheet.create({
    container: {
      backgroundColor:"dodgerblue",
      height:"100%",
      flex:1,
      justifyContent:"center"
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    row:{
      flex:1,
      width:"100%",
      height:200,
      backgroundColor:"tomato"
    }
  })
  return (
    <View style={styles.container}>
        <FlatList
        data={imageNames}
        renderItem={({item}) => <Card text={item.id}/>}
        keyExtractor={item => item.id}
      />
    </View>
  )
}
