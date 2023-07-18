import { View, Text, StyleSheet, Button,StatusBar, ImageBackground, Dimensions,Image ,Switch,Alert,TextInput} from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAction } from '../../../actions/UserAction';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../../../components/Header';
import Switchbutton from '../../../components/Switchbutton';
import { Feather } from '@expo/vector-icons';
export default function Account() {
  //const dispatch = useDispatch();
  
  const[iconName,seticonName]=useState('')
  const[ico,setico]=useState('')
  const switchChanges=(value)=>{
   if(value.val==='1'){
    seticonName('chevron-right')
     setico('')
   }else{
    setico('chevron-left')
    seticonName('')
   }
  }
  const back=()=>{
     // accont back button
  }

  val=1

  if(val==1){
  return (
    
    <View style={styles.container}>
       
        <StatusBar/>
       <ImageBackground style={{flex:1}} source={require('../../../assets/back.png')}> 
           <View><Header func={back} name={'bell'}/></View>
           <View style={styles.content}>
               <View style={styles.profile}>
                    <View style={styles.profileBackgrund}>
                        <Image style={{position:'absolute',height:155,width:120,bottom:10,left:40}} source={require('../../../assets/avatar.png')}/>
                        <View style={{width:215,height:40,backgroundColor:'#ffffff',position:'absolute',top:80,borderRadius:50,left:-9,alignItems:'center',justifyContent:'center',elevation:7}}>
                           <Text style={{fontSize:18,fontFamily:'Poppins-medium'}}>Karen Allen</Text>
                        </View>
                    </View>
                     <Switchbutton  icon2={ico} icon={iconName}  func={switchChanges}/>
               </View>
               <View style={styles.editData}>
                     <View style={styles.profileData}>
                          {/* <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:10,marginTop:15,fontFamily:'Poppins-semibold'}}>I have 12 years experience in delivering Industry.</Text><Text style={{fontSize:10,fontFamily:'Poppins-semibold'}}>Hello! This is Karen Allen,</Text></View>
                          <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Text style={{color:'#7EB693',fontSize:15}}>Vehicle Type : </Text><View><Feather name='truck' size={20}/></View></View>
                          <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Text style={{color:'#7EB693',fontSize:15}}>Vehicle No :</Text><Text style={{fontSize:15}}>AASS-2345</Text></View>
                          <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Text style={{color:'#7EB693',fontSize:15}}>Available Time :</Text><Text style={{fontSize:15}}> 8.00 a.m - 7.00 p.m</Text></View>
                          <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Feather name='map-pin' size={25} color={"#7EB693"}/><Text style={{color:'black',fontSize:15,marginTop:3,marginLeft:10}}>:colombo</Text></View>
                          <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Feather name='phone' size={25}  color={"#7EB693"}/><Text style={{color:'black',fontSize:13,marginTop:3,marginLeft:10}}>:077-1780073</Text></View>
                          */}
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}><TextInput style={{width:'80%',height:50,borderColor:'green',borderWidth:1,borderRadius:15,paddingLeft:20}} selectionColor={'green'} /></View>
                            <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Text style={{color:'#7EB693',fontSize:15,marginTop:4}}>Vehicle No :</Text><TextInput style={{width:'70%',height:30 ,borderColor:'green',borderRadius:5,borderWidth:1,paddingLeft:15}}/></View>
                            <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Text style={{color:'#7EB693',fontSize:15,marginTop:4}}>Available Time :</Text><TextInput style={{width:'62%',height:30 ,borderColor:'green',borderRadius:5,borderWidth:1,paddingLeft:15}}/></View> 
                            <View style={{marginStart:29,marginTop:25,flexDirection:'row'}}><Feather name='map-pin' size={25} color={"#7EB693"}/><TextInput style={{width:'50%',height:30 ,borderColor:'green',borderRadius:5,borderWidth:1,paddingLeft:15,marginLeft:10}}/></View>
                      </View>
               </View>
           </View>
        </ImageBackground>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    //backgroundColor:'red',
   
  },
  content:{
    height:'100%',
    width:'100%',
   // backgroundColor:'red'
  },

  profile:{
    width:'100%',
    height:'30%',
    alignItems:'center',
    justifyContent:'center',
   // backgroundColor:'white'

  },
  editData:{
    height:'70%',
    width:'100%',
    alignItems:'center',
    //backgroundColor:'green'
  },
  profileBackgrund:{
    width:200,
    height:100,
    backgroundColor:'#7EB693',
    borderTopRightRadius:100,
    borderTopLeftRadius:90
  },
  profileData:{
    width:'90%',
    height:'67%',
    marginTop:30,
    //marginEnd:5,
    elevation:7,
   // marginLeft:29,
    borderRadius:40,
    backgroundColor:'#fff'
  }
})





// <Button title='Log out' onPress={() => {
//   dispatch(setUserAction(''))
// }}></Button>