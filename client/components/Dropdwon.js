import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';



function Dropdwon(props) {
    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    
    return (
       
     <Dropdown
      data={props.data}
      valueField="value"
      labelField="label"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
           (item)=>props.getdata(item.value)
           // setValue(item.lable)
            console.log(value)
            setIsFocus(false);
          }}
      style={[styles.drop,props.sty]}
      containerStyle={[{width:'99%',height:160,borderColor:'green',bottom:30},props.styledropdwon]}
      placeholderStyle={{fontSize:13,marginLeft:10,fontWeight:500}}
      inputSearchStyle={[{borderColor:'green',borderRadius:10,height:40,color:'red',fontSize:12,paddingLeft:10},props.styleinputSerach]}
      searchPlaceholder={props.placeholder}
      placeholder={props.name}
      showsVerticalScrollIndicator={false}
      flatListProps={[styles.listbackgrund,props.droplist]}
      search={true}
     
     />

 
      
    );
}
const styles=StyleSheet.create({
    drop:{
        width:'85%',
        height:30,
        borderRadius:15,
        marginLeft:10,
        borderWidth:1,
        borderColor:'green',
        paddingLeft:20,
        //fontWeight:900
    
    },
    listbackgrund:{
        backgroundColor:'#ffff',
        elevation:5,
        borderColor:'black',
        
    }
    
})

export default Dropdwon;