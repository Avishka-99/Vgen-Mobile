import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, StatusBar, NativeEventEmitter } from 'react-native'
import React, { useRef, useState } from 'react'
import Card from '../../../components/VerticalCard'
import { Image } from 'expo-image';
import { FlashList } from "@shopify/flash-list";
import SearchBar from '../../../components/SearchBar';
import PopularProducts from '../segments/PopularProducts';
import HorizonalCard from '../../../components/HorizonalCard';
import DeliverAddress from '../segments/DeliverAddress';
import { Animated } from 'react-native';
import * as Device from 'expo-device';
const { diffClamp } = Animated;
export default function Home({ navigation }) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const HEADER_HEIGHT = Dimensions.get("screen").height/14;
  const diffClamp = Animated.diffClamp(scrollY,0,HEADER_HEIGHT);
  const headerTranslateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
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
      paddingTop: 0,
      backgroundColor: "#E6E6E6",
    },
    container_2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"white"

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
        style={{flex: 1,width:"100%"}}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        >
          <HorizonalCard type="food" />
          <HorizonalCard type="store" />
          <HorizonalCard type="food"/>
          <HorizonalCard type="food"/>
          <HorizonalCard type="food"/>
          <HorizonalCard type="food"/>
          <HorizonalCard type="food"/>


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
    </View>

  )
}
