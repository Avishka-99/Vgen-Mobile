import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView,FlatList } from 'react-native'
import Header from '../../../components/Header';
import Order from '../../../components/Order';
import { Feather } from '@expo/vector-icons';
import Axios from '../../../api/Axios';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints'
import SignIn from '../../user/SignIn';

function Home({navigation}) {

    const [details,setDeails]=useState([]);
    const [order,setorder]=useState([])
    console.log()

  // const userId=JSON.parse(atob(TOKEN.split('.')[1])).userId;
   //console.log('my id',userId)
    const back=()=>{
        console.log('back')
    }
    const data=[
        {id:'1'},
        {id:'2'},
        {id:'3'},
        {id:'4'},
        {id:'5'},
        {id:'6'}
    ]
    //get revanue and count 
    const getDetails = async ()=>{
        const res=await Axios.get(API_ENDPOINTS.Delivery_DETAILS_URL); 
        setDeails(res.data);
    }
    //
   const Accsept=(id)=>{
    navigation.navigate('Delivery')
   }
  //get oder for deliver
    useEffect(()=>{
        const intervalTime=setInterval(async()=>{
            const order= await Axios.get(API_ENDPOINTS.Delivery_Orders_URL);
            setorder(order.data)
           // console.log('hiiii')
        },10000);

        return ()=>{
           clearInterval(intervalTime);
        }

    },[]);
  //   

  //console.log('hiii')

   
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/back.png')} style={{flex:1}}>
                 <Header func={back} name={'bell'} sty={styles.header}/>

                 <View style={styles.deliverDitels}>
                     <View style={{backgroundColor:'#ffff',width:'25%',height:60,borderTopRightRadius:50,borderBottomRightRadius:50,elevation:7,shadowColor:'black',alignItems:'center',justifyContent:'center'}}>
                          <Feather name='truck' color={'#7EB693'} size={30}/>
                     </View>
                     <View style={{width:'50%',height:70,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'#274C5B'}}>Hellow  Avater</Text>
                        <Text style={{fontSize:12,fontWeight:300}}>Colombo,Srilanka</Text>
                     </View>
                     <View style={{backgroundColor:'#ffff',width:'25%',height:60,borderTopLeftRadius:50,borderBottomLeftRadius:50,elevation:7,shadowColor:'black',alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:40,height:40,borderRadius:50,backgroundColor:'#ffff'}}>
                            <Image 
                              source={require('../../../assets/avatar.png')}
                              style={{width:40,height:40,borderRadius:50,borderColor:'#7EB693',borderWidth:1}}
                            />
                        </View>
                     </View>
                 </View>
                   <View style={styles.Revenue}>
                       <View style={styles.count}>
                         <Text style={{color:'#4D5959',fontSize:20,fontWeight:600}}>Count</Text>
                         <Text style={{fontSize:18,fontWeight:300}}></Text>
                         <View style={{width:60,height:60,borderRadius:50,position:'absolute',top:100}}>
                            <Image style={{width:60,height:60,borderRadius:50,borderWidth:1,borderColor:'#EFD373'}} source={require('../../../assets/count1.jpg')}/>
                         </View>
                       </View>
                       <View style={styles.profite}>
                          <Text style={{color:'#4D5959',fontSize:20,fontWeight:600}}>Revenue</Text>
                          <Text style={{fontSize:15,fontWeight:300}}>Rs:100,000</Text>
                          <View style={{width:60,height:60,borderRadius:50,position:'absolute',top:100}}>
                            <Image style={{width:60,height:60,borderRadius:50,borderWidth:1,borderColor:'#EFD373'}} source={require('../../../assets/th1.jpg')}/>
                          </View>
                       </View>
                   </View>
                   <View style={styles.recvest}>
                    <FlatList
                      data={data}
                      renderItem={({item})=>(
                        <Order funcname={Accsept}/>
                      )}
                      keyExtractor={item=>item.id}
                      contentContainerStyle={styles.flatlist}
                      disableVirtualization={true}
                      ListFooterComponent={<View style={{marginBottom:100}}></View>}
                    />
                      
                   </View>
            </ImageBackground>

        </View>
        
    );
}
const styles=StyleSheet.create({
    header:{
        marginTop:15, 
    },
    deliverDitels:{
       width:Dimensions.get('window').width,
       height:60,
       marginTop:15,
       //backgroundColor:'red',
       flexDirection:'row'
    },
    Revenue:{
        width:Dimensions.get('window').width,
        height:150,
        //backgroundColor:'red',
        marginTop:30,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    count:{
        width:130,
        height:'90%',
        marginLeft:2,
        borderRadius:20,
        backgroundColor:'#ffff',
        alignItems:'center',
        justifyContent:'center',
        elevation:7,
        borderWidth:1,
        borderColor:'#EFD373'
        
    },
    profite:{
       width:180,
       height:"90%",
       borderRadius:20,
       backgroundColor:'#ffff',
       marginLeft:30,elevation:7,
       alignItems:'center',
       justifyContent:'center',
       borderWidth:1,
       borderColor:'#EFD373'
    },
    recvest:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex:1,
        //backgroundColor:'red',
        marginTop:20,
        alignItems:'center'
    },
    flatlist:{
        width:Dimensions.get('window').width, 
        //height:Dimensions.get('window').height-400,
        alignItems:'center',
        
    },
    last:{
        marginBottom:70
    }
})

export default Home;