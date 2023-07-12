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
import { Feather } from '@expo/vector-icons'


export default function Delivery() {

  const windowHeghit=Dimensions.get('screen').height
 
  return (
    <SafeAreaView style={[styles.container,]}>
       <StatusBar/>
    <View style={[styles.map,{height:windowHeghit}]}>
      <View style={styles.serachView}>
          <View style={{flexDirection:'row',borderRadius:20, backgroundColor:'#fff',elevation:12}}>
              <Feather style={{marginTop:8,marginLeft:6}}name='search' size={30} color="red"/>
              <TextInput 
                  style={styles.serach}
                  placeholder='find location'
               />
          </View>
        
           
        </View>
          
      </View>
      
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    //backgroundColor:'pink',
    marginTop:Platform.OS ==='android'? StatusBar.currentHeight:Platform.OS==='ios'?StatusBar.currentHeight:true
   
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
    //backgroundColor:'black',
    marginTop:2
    
  }
  
})