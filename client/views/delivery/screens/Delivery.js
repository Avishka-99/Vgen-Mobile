import {
   View, 
   Text, 
   StyleSheet,
   SafeAreaView, 
   Platform,StatusBar,
   TextInput,
   TextInputWithIcon,
   Dimensions,
   Button,} from 'react-native'
import React, { useRef } from 'react'
import { useState } from 'react';
import MapView ,{Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API } from '../../../keys/Keys';
import { Feather } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


export default function Delivery({route}) {
  var loction_deliver=useSelector((state)=>state.deliveryReducer.location)
  console.log("rrerytyty",loction_deliver)
  const[map,setmap]=useState({
    latitude: 7.638763374154984,
    latitudeDelta: 2.4436630602649263, 
    longitude: 80.98392890766263, 
    longitudeDelta: 1.1679803207516812 
  }
)
  const shop_latitude=route.params?.shop_lati;
  const shop_longitude=route.params?.shop_longi;
  const mapref=useRef(null)
  //console.log("hiiii",deliver_latitude)
  console.log("loooooooo",shop_latitude)
  console.log("logiiii",shop_longitude)
  
  const RegionChange =(regtion)=>{
    console.log(regtion)
  }

  const bitweenpoint=[
    {
      title:"start",
      location:{
        latitude:loction_deliver.latitude ==null?6.90531:loction_deliver.latitude,
        longitude:loction_deliver.longitude==null?79.862316:loction_deliver.longitude,
      },
      descryption:"Dilever",
      
    
    },

    {
      title:"end",
      location:{
        latitude:shop_latitude,
        longitude:shop_longitude
       
      },
      descryption:"custemore home"
    }
  ]

  const styleDark=[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
      }
    
  
  ]
  const showPoint=()=>{
   return bitweenpoint.map((item,index)=>{
       return(
         <Marker
           key={index}
           coordinate={item.location}
           title={item.title}
           description={item.descryption}
          // image={item.Image}
           
         />
       )
   })
  }

  const windowHeghit=Dimensions.get('screen').height
 
  return (
    <SafeAreaView style={[styles.container,]}>
       {/* <StatusBar/> */}
    <View style={[styles.map,{height:windowHeghit}]}>
      <View style={styles.serachView}>
          {/* <View style={{flexDirection:'row',borderRadius:20, backgroundColor:'#fff',elevation:12,position:'absolute',top:20}}>
              <Feather style={{marginTop:8,marginLeft:6}}name='search' size={30} color="red"/>
              <TextInput 
                  style={styles.serach}
                  placeholder='find location'
               />
          </View> */}
        </View>

        {
          (loction_deliver.latitude==null 
            && loction_deliver.longitude==null)?<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            <ActivityIndicator size={"number"} theme={{colors:{primary:'green'}}} />
          </View>:<MapView style={styles.mapview}
            region={{
              latitude:bitweenpoint[0].location.latitude,
              longitude:bitweenpoint[0].location.longitude,
              latitudeDelta:0.1, 
              longitudeDelta: 0.1, 
            }}
            onRegionChangeComplete={RegionChange}
            ref={mapref}
            //customMapStyle={styleDark}
          >

            {showPoint()}
      
            <MapViewDirections
               origin={bitweenpoint[0].location}
               destination={bitweenpoint[1].location}
               apikey={GOOGLE_API}
               strokeWidth={6}
               strokeColor='black'
            />
         </MapView>  
        }

        
 
      </View>
     
      
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor:'pink',
   // marginTop:Platform.OS ==='android'? StatusBar.currentHeight:Platform.OS==='ios'?StatusBar.currentHeight:true
   
  },
  serachView:{
    width:'100%',
    //position:'absolute',
    zIndex:2,
    //height:70,
    marginTop:7,
    justifyContent:'center',
    alignItems:'center',
    //backgroundColor:'#fff',
   // elevation:2,
    //shadowColor:'black'
    
  },
  serach:{
    width:'87%',
    height:'100%',
    paddingLeft:10,
    padding:10
    //borderRadius:10,
    //borderWidth:1,
    //borderColor:'black'
  },
  map:{
    
    width:'100%',
    //height:windowHeghit-10,
    //height:"100%",
   // backgroundColor:'black',
    //marginTop:2
    
  },
  mapview:{
    width:'100%',
    height:'100%'
    
  }
  
})