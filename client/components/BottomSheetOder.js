import {View, Text, StyleSheet, Switch, 
  Dimensions,ImageBackground,FlatList,ScrollView,Image} from 'react-native';
import Order from './Order';
import { Feather } from '@expo/vector-icons';
import Button from './Button';


export default function BottomSheetOrder(props){
   // const bottomSheetRef = React.createRef();
    return(
    
         <View 
         style={{flex:1,
          backgroundColor:"#ffff",
          borderTopRightRadius:15,
          borderTopLeftRadius:15
         }}>
            <View style={styles.profileDitels}>
             
               <View style={{width:'50%',height:"100%",flexDirection:'row',padding:10}}>
                  <View style={{height:60,width:60,borderRadius:20,}}>
                      <Image source={require('../assets/avatar.png') } style={{width:60,height:60,borderRadius:20}}/>
                  </View>

                    
                  <View style={{marginLeft:14,marginTop:4}}>
                    <Text style={{fontFamily:"Poppins-medium"}}>{props.data.rest_name}</Text>
                    <Text style={{fontFamily:"Poppins-medium"}}>{props.data. rest_contacNo}</Text>
                  </View>
               </View>

               <View style={{width:40,height:40,marginTop:'4%',marginHorizontal:"32%",backgroundColor:"#ffff",alignItems:'center',justifyContent:'center',borderRadius:10,elevation:3}}><Feather name='phone' size={25} color={"red"}/></View>

           </View>

           <View style={{
             width:'100%',
             height:'100%',
             //backgroundColor:'red'
             }}>
                
           
                <View style={{marginLeft:'5%',marginTop:'0%'}}><Text style={{fontFamily:"Poppins-medium"}}>Order quantitiy x {props.data.order_quantitiy} Amount {props.data.order_amount} order free 200 </Text></View>
                <View style={{marginLeft:'5%',marginTop:'0%'}}><Text style={{fontFamily:"Poppins-medium"}}>{props.data.rest_address}</Text></View>
               { !props.setBoolean?<Button butname={"Accept"} func={props.func} custermize={styles.custermize}/>:null}
                {!props.setBoolean?<Button butname={"Reject"} func={props.funcReject} custermize={styles.custermize1}/>:null}
                { props.setBoolean?<Button butname={"Prosess"} func={props.funprosess} custermize={styles.custermize2}/>:null}

           </View>
     
     </View>
)

}

const styles=StyleSheet.create({
  
  profileDitels:{
    
    width:Dimensions.get("screen").width,
    height:"35%",
    //backgroundColor:"red",
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    flexDirection:"row",
    
    //justifyContent:'center'
    //alignItems:'center'
  },
  custermize:{
    width:90,
    height:30,
    borderRadius:10,
    marginLeft:100,
    position:'absolute',
    marginTop:79,
    
  },
  custermize1:{
    width:90,
    height:30,
    borderRadius:10,
    marginLeft:228,
    position:'absolute',
    marginTop:79,
    //backgroundColor:'red'
    
  },
  custermize2:{
    width:100,
    height:35,
    borderRadius:10,
    marginLeft:145,
    position:'absolute',
    marginTop:82,
  }
    
    
  
})