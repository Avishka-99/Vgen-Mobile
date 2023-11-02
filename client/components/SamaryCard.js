import { View, Platform,Text,
     StyleSheet, StatusBar,
      ImageBackground, Dimensions, 
      Image, Switch, Alert, TextInput,
      ScrollView ,Card,Button,Icon} from 'react-native'
import React, { useState } from 'react'


export default function SamaryCard(props){
  // console.log("uuuuuuu",props.data[0]) 

    return(
        
        <View style={styles.cardFrame}>
           <View style={styles.imageView} >
            <Image source={require("../assets/food1.png")} 
              resizeMode="contain"
              style={{width:"100%",height:"100%"}}
            />

           </View>
           <View style={styles.orderData}>
              <View style={styles.text}><Text style={{fontSize:15,fontFamily:"Poppins-medium"}} >{props.data.foodNAme}</Text></View>
              <View style={styles.text1} ><Text style={{fontFamily:"Poppins-medium"}}>Total Quantitiy x {props.data.quantitiy}</Text></View>
              <View style={styles.text1}><Text style={{fontFamily:"Poppins-medium"}}>Total Amount {props.data.price}</Text></View>
              <View style={styles.text1}>{props.data.state==='online'?<Text style={{fontFamily:"Poppins-medium",color:'red'}}>Online payment</Text>:
              <Text style={{fontFamily:"Poppins-medium",color:'red'}}>COD payment</Text>}</View>
              
           </View>
        </View> 
        
    )
}

const styles =StyleSheet.create({
    cardFrame:{
        flexDirection:"row",
        //width:Dimensions.get("screen").width/1.2,
        height:130,
        backgroundColor:'#ffff',
       // marginHorizontal:Dimensions.get("screen").width/12,
        marginTop:20,
        borderRadius:10,
        //padding:10,
        elevation:3
        
    },
    imageView:{
        width:Dimensions.get("screen").width/3.1,
        height:"100%",
        //backgroundColor:"green",
        borderRadius:12,
        //padding:5
    },
    orderData:{
        width:Dimensions.get("screen").width/2,
        height:"100%",
        //backgroundColor:'green',
        flexDirection:'column' ,
        borderTopRightRadius:12,
        borderBottomRightRadius:12
    },
    text:{
      marginLeft:Dimensions.get("screen").width/19,
      marginTop:9,
      marginEnd:Dimensions.get("screen").width/19
    },
    text1:{
        marginLeft:Dimensions.get("screen").width/16,
      marginTop:0.5
    }
}) 