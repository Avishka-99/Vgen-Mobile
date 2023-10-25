import React, { useState } from 'react';
import { View,
    Text, 
    StyleSheet, 
    StatusBar, 
    ImageBackground,
    Dimensions,
    Image, 
    Switch,
    Alert, 
    TextInput,
    ScrollView,
    FlatList, 
    KeyboardAvoidingView,
    Modal,
    
     } from 'react-native'
import * as ImagePicker from 'expo-image-picker';     
import Header from '../../../components/Header';
import { Feather } from '@expo/vector-icons'
import Dropdwon from '../../../components/Dropdwon';
import Button from '../../../components/Button';

function Complen(props) {
    const[ViewImage,setViewImage]=useState(false)
    const[image,setimage]=useState([])

    const complaintType=[
        {label:'I dont reserve money',value:'1'},
        {label:'customer rejects to accept order ',value:'2'},
        {label:'Items did not received',value:'3'},
    ]

    const area = [
        { label: 'Colombo', value: '1' },
        { label: 'Kurunagela', value: '2' },
        { label: 'Gall', value: '3' },
        { label: 'Kandy', value: '4' },
        { label: 'Anuradapura', value: '5' },
        { label: 'Trinco', value: '6' },
        { label: 'Hambanthota', value: '7' },
        { label: 'Kegalla', value: '8' },
      ];

    const user=[
        { label:'madawa', value: '1' },
        { label:'Madawa', value: '2' },
        { label:'shanu', value: '3' },
        {label:'shashika',value:'4'}
    ]  
    
    const  back=()=> {
      //back
        
    }

    const imageView=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection:true,
            
          }).then((result)=>{
      
            console.log(result);
      
            if (!result.canceled) {
                const selectedImageURIs = result.assets.map((asset) => asset.uri);
                setimage(selectedImageURIs);
            }
      
          })
        setViewImage(true)
    }

    return (
       
             <View style={{flex:1}}>
                <ImageBackground style={{flex:1}}  source={require('../../../assets/back.png')}>
                    <Header  func={back} name={'bell'} sty={styles.Header}/> 

                   <View style={styles.deliverDitels}>
                        <View style={{backgroundColor:'#ffff',width:'25%',height:60,borderTopRightRadius:50,borderBottomRightRadius:50,elevation:7,shadowColor:'black',alignItems:'center',justifyContent:'center'}}>
                            <Feather name='truck' color={'#7EB693'} size={30}/>
                        </View>
                        <View style={{width:'50%',height:70,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:20,color:'#274C5B'}}>New Complaint</Text>
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
                  
                     <View style={styles.complenView}>
                        
                      
                       <View style={{width:'90%',Height:'70%',backgroundColor:'#fff',marginTop:'5%',marginBottom:'10%',borderRadius:20,borderWidth:1,borderColor:'#7EB693',alignItems:'center',alignSelf:'center'}}>
                           <Dropdwon data={complaintType} sty={styles.dropdwon} styledropdwon={styles.droplist} styleinputSerach={styles.dropdownSerachbar} placeholder='select type' name='select compaint type' />
                           <Dropdwon data={area} sty={styles.dropdwon} styledropdwon={styles.droplist} styleinputSerach={styles.dropdownSerachbar} placeholder='find area' name='select area' />
                           <Dropdwon data={user} sty={styles.dropdwon} styledropdwon={styles.droplist} styleinputSerach={styles.dropdownSerachbar} placeholder='find user' name=' user name' />
                           
                           <Button func={imageView} butname={'Add Image'} custermize={styles.button} sty={{fontSize:17}} />
                          
                            
                            {  ViewImage?
                                <View style={styles.complenImage} > 
                                    <View style={{width:'32%',height:'90%',marginTop:'2%'}}><Image style={{width:'100%',height:'100%',borderRadius:10}} source={ image?{uri:image[0]}:require('../../../assets/avatar.png')}/></View>
                                    <View style={{width:'32%',height:'90%',marginLeft:'2%',marginTop:'2%'}}><Image style={{width:'100%',height:'100%',borderRadius:10}} source={ image?{uri:image[1]}:require('../../../assets/avatar.png')}/></View>
                                    <View style={{width:'32%',height:'90%',marginLeft:'2%',marginTop:'2%'}}><Image style={{width:'100%',height:'100%',borderRadius:10}} source={ image?{uri:image[2]}:require('../../../assets/avatar.png')}/></View>
                                </View>:<View></View>
                             
                            }  
                           
                            <TextInput
                             style={{width:'82%',
                             height:'10%',
                             backgroundColor:'#fff',
                             elevation:7,paddingLeft:30,
                             borderRadius:15,marginTop:'7%',
                             paddingEnd:30}} placeholder='Discription'
                             placeholderTextColor={'black'}
                             maxLength={70} 
                             multiline={true}
                             />

                            <Button func={imageView} butname={'Add complaint'} custermize={styles.button2} sty={{fontSize:15}}/> 
                           
                        
                       </View> 

                       
            
                   </View>
  
                </ImageBackground>
             </View>
       
    );
}

const styles=StyleSheet.create({
    Header:{
        marginTop:0
    },
    deliverDitels:{
        width:Dimensions.get('window').width,
        height:60,
        marginTop:15,
       // backgroundColor:'red',
        flexDirection:'row'
     },
     complenView:{
        width:'100%',
        height:'100%',
       // flex:1,
        
        //backgroundColor:'red',
       // alignItems:'center',
        

     },
     dropdwon:{
        height:'10%',
        marginTop:'7%',
        borderColor:'#fff',
        elevation:7,
        backgroundColor:'#fff',
        
     },
     droplist:{
        height:'60%',
        borderRadius:30,
        elevation:7,
        borderColor:'#fff'
     },
     dropdownSerachbar:{
        width:'90%',
        marginLeft:'5%',
        marginTop:'3%'
     },
     complenImage:{
        width:'90%',
        height:'20%',
       // backgroundColor:'red',
        marginTop:'5%',
        flexDirection:'row',
       // borderRadius:20,
        //borderWidth:1,
        borderColor:'green'
     },
     button:{
        marginTop:20,
        width:200,
        height:50,
        borderRadius:30

     },
     button2:{
        width:200,
        height:50,
        borderRadius:30
     }
     
})

export default Complen;