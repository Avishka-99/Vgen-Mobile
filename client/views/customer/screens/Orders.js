import { View, Text, StyleSheet, StatusBar,
     ImageBackground, Dimensions, Image, Switch, Alert, 
     TextInput,ScrollView,FlatList } from 'react-native'

import SamaryCard from '../../../components/SamaryCard'
import * as ALL_ACTIONS from '../../../actions/AllActions'
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import Axios from '../../../api/Axios';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


export default function Orders(){
 
const [orderHistory,setOrderHistory]=useState([]);
const userID=useSelector((state) => state.userReducer.userid)
//console.log("user id",userID)
  
 useEffect(()=>{ 
    const getHistory=async()=>{
        try{
          
            await Axios.get(API_ENDPOINTS.Delivery_Orders_State_URL,{
                  params:{
                    userid:userID
                  }
            }).then((Response)=>{
                setOrderHistory(Response.data)
            })
          

        }catch(error){
           console.log(error)
        }
    }

    // const interval=setInterval(getHistory,10000);

    // return ()=>{
    //   clearInterval(interval);
    // }

 },[userID])

 //console.log("datatat",orderHistory)


    return(
        
        <View style={{flex:1,backgroundColor:'white'}}>
            { 
               orderHistory.length==0?<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
               <ActivityIndicator size={"number"} theme={{colors:{primary:'green'}}} />
             </View>:
             
                <View>

                 < FlatList
                      data={orderHistory}
                      showsVerticalScrollIndicator={true}
                      renderItem={({item})=>(
                        <SamaryCard data={item}/>
                      )}
                      
                      keyExtractor={item=>item.order_id}
                      contentContainerStyle={styles.flatlist}
                      disableVirtualization={true}
                      ListFooterComponent={<View style={{marginBottom:100}}></View>}
                      
                    />

                </View>
            
            }
        </View>
        
    )
}

const styles=StyleSheet.create({
    flatlist:{
        
        width:Dimensions.get('window').width, 
        height:Dimensions.get('window').height-400,
        alignItems:'center',
        backgroundColor:'red',
        marginTop:Dimensions.get("screen").height/3
        
    }
})