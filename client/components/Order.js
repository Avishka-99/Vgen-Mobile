import { Feather } from '@expo/vector-icons';
import Button from './Button';
import React from 'react';
import { View, Text,
     StyleSheet, StatusBar, 
     ImageBackground, 
     Dimensions, Image, 
     Switch, 
     Alert, 
     TextInput,
     ScrollView } from 'react-native'


export default function Order(props) {
   // console.log(props.data.length)
    return (
       <View style={[styles.card,props.cardstyle]}>
          <View style={styles.oderimage}>
             <Text style={{fontSize:8,color:'black',marginTop:15,fontFamily:'Poppins-semibold'}}>custemore Name:{props.data.vgen_name}</Text>
             <Text style={{fontSize:8,color:'black',marginTop:0,fontFamily:'Poppins-semibold'}}>custemore No:{props.data.vgen_contacNo}</Text>
             <Text style={{fontSize:8,color:'black',marginTop:0,fontFamily:'Poppins-semibold'}}>Address:{props.data.vgen_address}</Text>
             <View style={{marginTop:10,marginLeft:4}}>
             <Text style={{fontSize:11,color:'black',marginTop:0,fontFamily:'Poppins-semibold',color:'green'}}>Total Quntity x {props.data.order_quantitiy}</Text>
             <Text style={{fontSize:11,fontWeight:500,fontFamily:'Poppins-semibold',color:'green'}}>Total Amout:{props.data.order_amount}</Text>
             <Text style={{fontSize:11,fontWeight:500,fontFamily:'Poppins-semibold',color:'green'}}>Delivery Free:{300}</Text>
             </View>
          </View>
          <View style={styles.orderditels}>
             <Text style={{fontFamily:'Poppins-semibold',color:'black',marginTop:7}}>{props.shopname}</Text>
             <Text style={{fontFamily:'Poppins-semibold',fontSize:7,color:'black'}}>{props.data.rest_address}</Text>
             <Text style={{fontSize:10,marginTop:0,fontWeight:500}}>shop NO-{props.data.rest_contacNo}</Text>
             <View style={{flexDirection:'row',marginTop:10}}><Feather name='map-pin' size={15} color={'green'}/><Text style={{fontFamily:'Poppins-semibold',color:'green',fontSize:10}}> {50} away</Text></View>
             <View style={{flexDirection:'row'}}>
                <Button butname='Accept' custermize={{width:'60%',height:30,marginLeft:15,marginTop:12}} sty={styles.buttextStyle} func={()=>props.funcname()}/>
                {/* <Button butname='Reject' custermize={styles.buttonstyle} sty={styles.buttextStyle}  func={()=>console.log('Reject')}/> */}
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
        //alignItems:'center',
        //justifyContent:'center',
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
        marginTop:12
    },
    buttextStyle:{
        fontSize:10
    }
    
})

//export default Order;