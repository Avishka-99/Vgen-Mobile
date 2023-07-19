import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';



function Dropdwon(props) {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
   
    return (
     <Dropdown
      data={data}
      valueField="value"
      labelField="label"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
      style={styles.drop}
      
     
     />
      
    );
}
const styles=StyleSheet.create({
    drop:{
        width:'85%',
        height:30,
        borderRadius:15,
        borderWidth:1,
        borderColor:'green'
    
    }
})

export default Dropdwon;