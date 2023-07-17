import { StyleSheet, Text, View, TextInput } from 'react-native'
import React,{useState} from 'react'
import { Feather } from '@expo/vector-icons';
import TextInputField from './TextInputField'
const SearchBar = () => {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.Container}>
            <TextInputField isSecured={false} iconType={Feather} iconProps={{ "name": "user", "size": 24 }} placeholder="Email" function={setEmail} textInputStyles={{height:40,reverse:true}}/>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    Container: {
        height: "10%",
        backgroundColor: "tomato",
        width: "100%",
        alignItems:"center"
    },
    searchBox: {
        height: "100%",
        width: "100%",
    }
})