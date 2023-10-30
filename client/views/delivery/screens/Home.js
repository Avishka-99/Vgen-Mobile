import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView,FlatList } from 'react-native'
import Header from '../../../components/Header';
import Order from '../../../components/Order';
import { Feather } from '@expo/vector-icons';
import Axios from '../../../api/Axios';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints'
import {useDispatch, useSelector} from 'react-redux';
import * as Location from 'expo-location';
import * as ALL_ACTIONS from '../../../actions/AllActions'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


function Home({navigation}) {

    const [details,setDeails]=useState([]);
    let [order,setOder]=useState([])
    const [deliver,setdeliver]=useState([])
    let [lati,setlati]=useState(0.0)
    let [longi,setlongi]=useState(0.0)
    const [errorMsg, setErrorMsg] = useState('');
    const userID =useSelector((state) => state.userReducer.userid)
    const dispatch = useDispatch();
    


   const value=[] // push card data

   const Accsept=(id)=>{
    navigation.navigate('Delivery',{
      deliver_lati:lati,
      deliver_longi:longi
    })
   }

   useEffect(()=>{
    const fetchData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        dispatch(ALL_ACTIONS.setRiderLocation(currentLocation.coords))
        setlati(currentLocation.coords.latitude);
        setlongi(currentLocation.coords.longitude);

          const order= await Axios.get(API_ENDPOINTS.Delivery_Orders_URL, {
          params: {
            userid: userID,
            lat: currentLocation.coords.latitude,
            lon: currentLocation.coords.longitude,
          },
        });

        setOder(order.data);
      } catch (error) {
        setErrorMsg('Error fetching location or orders: ' + error.message);
      }
    };

    const intervalTime = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalTime);
    };

    },[userID]);   

   order.map((item)=>{
     value.push(item)
   })

   console.log("shgfsdgf",value)
  
  console.log("lati",lati)
  console.log("long",longi)
  //console.log('eaultttt',orders.orderTableData[0][0]) 
    
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/back.png')} style={{flex:1}}>
                 {/* <Header func={back} name={'bell'} sty={styles.header}/> */}

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
                         <Text style={{fontSize:18,fontWeight:300}}>05</Text>
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
                      data={value}
                      renderItem={({item})=>(
                          <Order 
                          funcname={Accsept} 
                          quntity={item.order_quantitiy} 
                          fname={item.vgen_name} 
                          contact={item.vgen_contacNo}
                          address={item.vgen_address}
                          amount={item.order_amount}
                          free={300}
                          shopname={item.rest_name}
                          shopAddress={item.rest_address}
                          shopNo={item.rest_contacNo}
                          distance={300}
                          
                          />
                      )}
                      keyExtractor={item=>item.order_id}
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
       marginTop:35,
       //backgroundColor:'red',
       flexDirection:'row'
    },
    Revenue:{
        width:Dimensions.get('window').width,
        height:150,
        //backgroundColor:'red',
        marginTop:'10%',
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
       // backgroundColor:'red',//un coment this
        marginTop:'2%',
        alignItems:'center',
        //justifyContent:'center'
    },
    flatlist:{
        width:Dimensions.get('window').width, 
        //height:Dimensions.get('window').height-400,
        alignItems:'center',
        
    },
    last:{
        marginBottom:70
    },
    video:{
      width:'90%',
      height:'75%',
      //justifyContent:'center',
      alignItems:'center',
      //backgroundColor:'#ffff',
      marginTop:'10%',
      borderRadius:20,
      //borderWidth:2,
      //borderColor:'#EFD373',
      //elevation:3

      
      
    }
})

export default Home;