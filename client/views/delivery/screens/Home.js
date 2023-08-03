import React from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Dimensions, Image, Switch, Alert, TextInput,ScrollView } from 'react-native'
import Header from '../../../components/Header';
import { Feather } from '@expo/vector-icons';
function Home(props) {
    const back=()=>{
        console.log('back')
    }
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
        backgroundColor:'red',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Home;