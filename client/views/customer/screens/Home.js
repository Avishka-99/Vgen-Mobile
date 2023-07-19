import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, StatusBar } from 'react-native'
import React from 'react'
import Card from '../../../components/Card'
import { Image } from 'expo-image';
import { FlashList } from "@shopify/flash-list";
import SearchBar from '../../../components/SearchBar';
import PopularProducts from '../segments/PopularProducts';
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
    {
      id: 7, image: '../assets/products/3.jpeg'
    },
    {
      id: 8, image: '../assets/products/3.jpeg'
    },
    {
      id: 9, image: '../assets/products/3.jpeg'
    },
    {
      id: 10, image: '../assets/products/3.jpeg'
    },
    {
      id: 11, image: '../assets/products/3.jpeg'
    },
    {
      id: 12, image: '../assets/products/3.jpeg'
    },
  ]
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0
    },
    container_2:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"

    },
    image: {
      resizeMode: "cover",
      position: 'absolute',
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      opacity: 0.2,

      // marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    },
  })
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.container_2}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
          <PopularProducts />
          
          
        </ScrollView>
      </View>



      {/* <Image
        style={styles.image}
        source={require('../../../assets/vf-bg.png')}

      /> */}
      {/* <FlatList
        data={imageNames}
        renderItem={({ item }) => <Card text={item.id} image={item.image} />}
        keyExtractor={item => item.id}
      /> */}
    </View>
  )
}
