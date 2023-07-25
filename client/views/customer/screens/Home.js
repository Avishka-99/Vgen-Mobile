import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, StatusBar, NativeEventEmitter } from 'react-native'
import React, { useRef, useState } from 'react'
import { Image } from 'expo-image';
import { FlashList } from "@shopify/flash-list";
import SearchBar from '../../../components/SearchBar';
import PopularProducts from '../segments/PopularProducts';
import Card from '../../../components/Card';
import DeliverAddress from '../segments/DeliverAddress';
import { Animated } from 'react-native';
import * as Device from 'expo-device';
import Bottomsheet from '../../../components/Bottomsheet';
const { diffClamp } = Animated;
export default function Home({ navigation }) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const HEADER_HEIGHT = Dimensions.get("screen").height / 14;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const restaurants = [
    {
      id: 1,
      image: 'barista.png',
      name: 'Barista',
      location: 'Reid Aveue',
      rating: 4.5
    },
    {
      id: 2,
      image: 'pizzahut.png',
      name: 'Pizza hut',
      location: 'Havlock',
      rating: 4.2
    },
    {
      id: 3,
      image: 'srivihar.jpg',
      name: 'Sri Vihar',
      location: 'Thunmulla',
      rating: 4.6
    },
    {
      id: 4,
      image: 'nelumkole.jpg',
      name: 'Nelum kole',
      location: 'Thimbirigasyaya',
      rating: 4.3
    },
    {
      id: 5,
      image: 'savinra.jpg',
      name: 'Savinra',
      location: 'Nugegoda',
      rating: 4.5
    },
    {
      id: 6,
      image: 'mcdonalds.png',
      name: 'McDonalds',
      location: 'Reid Avenue',
      rating: 4.5
    },
    {
      id: 7,
      image: 'mayumi.jpg',
      name: 'Mayumi Home Foods',
      location: 'Nawala',
      rating: 4.7
    },
    {
      id: 8,
      image: 'kfc.jpg',
      name: 'KFC',
      location: 'Nugegoda',
      rating: 4.2
    },
    {
      id: 9,
      image: 'elite.jpg',
      name: 'Elite',
      location: 'Bambalapitiya',
      rating: 4.4
    },
    {
      id: 10,
      image: 'elina.webp',
      name: 'Elina Foods',
      location: 'Kirulapone',
      rating: 4.8
    },
    {
      id: 11,
      image: 'saveira.jpg',
      name: 'Saveira',
      location: 'Kohuwala',
      rating: 4.9
    },
    {
      id: 12,
      image: 'gogreen.jpg',
      name: 'Go Green',
      location: 'Townhall',
      rating: 4.7
    },
  ]
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      backgroundColor: "#E6E6E6",
      height: Dimensions.get("screen").height / 0.9
    },
    container_2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"

    },
    image: {
      resizeMode: "cover",
      position: 'absolute',
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      opacity: 0.2,
      marginTop: 80,

      // marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
    },
  })
  return (
    <View style={styles.container}>
      <Animated.View style={[{ transform: [{ translateY: headerTranslateY }] }]} >
        <DeliverAddress />
      </Animated.View>
      <Animated.View style={[styles.container_2, { transform: [{ translateY: headerTranslateY }] }]}>
        <SearchBar />
        {/* <Image
        style={styles.image}
        source={require('../../../assets/vf-bg.png')}

      /> */}

        <Animated.ScrollView
          style={{ flex: 1, width: "100%" }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        >
          {restaurants.map((item) => (
            <Card key={item.id} type="store" name={item.name} location={item.location} rating={item.rating} image={item.image} />
          ))}
          <Card type="empty" />


          {/* <Card type="food" />
          <Card type="store" />
          <Card type="food" />
          <Card type="food" />
          <Card type="food" />
          <Card type="food" />
          <Card type="food" /> */}


        </Animated.ScrollView>
      </Animated.View>


      {/* <Image
        style={styles.image}
        source={require('../../../assets/vf-bg.png')}

      /> */}
      {/* <FlatList
        data={imageNames}
        renderItem={({ item }) => <Card text={item.id} image={item.image} />}
        keyExtractor={item => item.id}
      /> */}
      <Bottomsheet />

    </View>

  )
}
