import {
   View, 
   Text, 
   StyleSheet,
   SafeAreaView, 
   Platform,StatusBar,
   TextInput,
   TextInputWithIcon,
   Dimensions} from 'react-native'
import React from 'react'
import { useState } from 'react';
import MapView ,{Marker,Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Feather } from '@expo/vector-icons'


export default function Delivery() {
  const[map,setmap]=useState({
    latitude: 7.638763374154984,
    latitudeDelta: 2.4436630602649263, 
    longitude: 80.98392890766263, 
    longitudeDelta: 1.1679803207516812 
  })

  const RegionChange =(regtion)=>{
    console.log(regtion)
  }

  const bitweenpoint=[
    {
      title:"start",
      location:{
        latitude:8.41,
        longitude:80.8289,
        
      },
      descryption:"shop",
      //Image:require('../../../assets/th.jpg')
      
    },
    {
      title:"end",
      location:{
        latitude:7.41,
        longitude:80.54,
       
      },
      descryption:"custemore home"
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
           image={item.Image}
           
         />
       )
   })
  }

  const windowHeghit=Dimensions.get('screen').height//AIzaSyCu5Ifufmv6BQ0gdhrRu7H72690HKuAmtk
 
  return (
    <SafeAreaView style={[styles.container,]}>
       <StatusBar/>
    <View style={[styles.map,{height:windowHeghit}]}>
      <View style={styles.serachView}>
          <View style={{flexDirection:'row',borderRadius:20, backgroundColor:'#fff',elevation:12,position:'absolute',top:20}}>
              <Feather style={{marginTop:8,marginLeft:6}}name='search' size={30} color="red"/>
              <TextInput 
                  style={styles.serach}
                  placeholder='find location'
               />
          </View>
        </View>
           
        <MapView style={styles.mapview}
            region={map}
            onRegionChangeComplete={RegionChange}
          >
            {showPoint()}
            <Polyline
               coordinates={[bitweenpoint[0].location,bitweenpoint[1].location]}
               strokeWidth={4}
               strokeColor="green"
            />
            {/* <MapViewDirections
               origin={bitweenpoint[0].location}
               destination={bitweenpoint[1].location}
               apikey='AIzaSyCu5Ifufmv6BQ0gdhrRu7H72690HKuAmtk'
               strokeWidth={3}
               strokeColor='green'
            /> */}
         </MapView>   
          
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