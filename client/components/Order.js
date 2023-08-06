import { Feather } from '@expo/vector-icons';
import Button from './Button';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView } from 'react-native'


function Order(props) {
    return (
       <View style={[styles.card,props.cardstyle]}>
          <View style={styles.oderimage}>
             <View style={{width:100,height:100,backgroundColor:'#fff',marginTop:7}}>
                <Image style={{width:100,height:100,borderRadius:10,}} source={require('../assets/food1.png')}/>
             </View>
             <Text style={{fontSize:13,color:'black',marginTop:10,fontFamily:'Poppins-semibold'}}>1 x One Pot Pasta</Text>
             <Text style={{fontSize:12,fontWeight:500,fontFamily:'Poppins-semibold'}}>Rs:1000</Text>
          </View>
          <View style={styles.orderditels}>
             <Text style={{fontFamily:'Poppins-semibold',color:'black',marginTop:7}}>Danu shop</Text>
             <Text style={{fontFamily:'Poppins-semibold',fontSize:7,color:'black'}}>235 Galle Rd, Wallawatte, Colombo</Text>
             <Text style={{fontSize:10,marginTop:3}}>custemore name-Dhanush</Text>
             <View style={{flexDirection:'row',marginTop:10}}><Feather name='map-pin' size={15} color={'green'}/><Text style={{fontFamily:'Poppins-semibold',color:'green',fontSize:10}}> 500m away</Text></View>
             <View style={{flexDirection:'row'}}>
                <Button butname={'Accsept'} custermize={styles.buttonstyle} sty={styles.buttextStyle} func={()=>props.funcname()}/>
                <Button butname={'Reject'} custermize={styles.buttonstyle} sty={styles.buttextStyle}  func={()=>console.log('Reject')}/>
             </View>
          </View>
       </View>
    );
}

const styles=StyleSheet.create({
    card:{
        width:'90%',
        height:190,
        backgroundColor:'#ffff',
        marginTop:40,
        //marginBottom:70,
        borderRadius:20,
        padding:15,
        flexDirection:'row',
        elevation:10
        
    },
    oderimage:{
        width:150,
        height:160,
        //backgroundColor:'#ffff',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        //elevation:7
    },
    orderditels:{
        width:190,
        height:160,
        borderRadius:20,
        backgroundColor:'#ffff',
        marginLeft:3,
        alignItems:'center',
        elevation:7
        //justifyContent:'center'
    },
    buttonstyle:{
        width:70,
        height:30,
        marginLeft:15,
        marginTop:20
    },
    buttextStyle:{
        fontSize:10
    }
    
})

export default Order;