import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import TextInputField from './TextInputField'
const SearchBar = () => {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.Container}>
            <TextInputField
                boderWidth={2}
                backgroundColor="#FDFFFC"
                isSecured={false}
                iconType={Feather}
                iconProps={{
                    "name": "search",
                    "size": 24,
                    "iconBackground": true,
                    "color": "white",
                    "iconBg": "#7EB693",
                    "radius": 30,
                }}
                placeholder="Search here.."
                function={setEmail}
                textInputRow={{
                    height: "80%",
                    reverse: true,
                    borderRadius: 30,
                }}
                textInput={{
                    width: "90%",
                    ioswidth: "85%"
                }} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    Container: {
        height: 60,
        backgroundColor: "transparent",
        width: "98%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        marginLeft: "1%",
        // marginTop:"1%"
    },
    searchBox: {
        height: "100%",
        width: "100%",
    }
})