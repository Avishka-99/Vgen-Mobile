import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { RESTAURANT_IMG_PATH } from '../constants/Constants';
import { BASE_URL } from '../constants/Constants';
import Axios from '../api/Axios';
export default function Card(props) {
    // useEffect(() => {
    //     // Replace 'http://your-server-ip-address:5000/images/image.jpg' with the actual URL of your image on the server
    //     const serverUrl = 'http://your-server-ip-address:5000/images/image.jpg';

    //     Axios
    //       .get(serverUrl, { responseType: 'blob' })
    //       .then((response) => {
    //         // Convert the blob response to a data URL
    //         const imageUrl = URL.createObjectURL(response.data);
    //         setImageUrl(imageUrl);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching image:', error);
    //       });
    //   }, []);




    //console.log('https://ec21-112-134-251-231.ngrok-free.app' + RESTAURANT_IMG_PATH + props.image)
    if (props.type == "store") {
        return (
            <View style={styles.StoreCardContainer}>
                <View style={styles.StoreCardContainerRow1}>
                    <Image style={{ height: "100%", width: "100%" }} source={{ uri: ' https://reactjs.org/logo-og.png' }} />
                </View>
                <View style={styles.StoreCardContainerRow2}>
                    <View style={styles.StoreCardContainerRow2Col}>
                        <View><Text style={styles.StoreCardStoreName}>{props.name}</Text></View>
                        <View><Text style={styles.StoreCardStoreAddress}>{props.location}</Text></View>
                    </View>
                    <View style={[{ flexDirection: "row", alignItems: "center" }, styles.StoreCardContainerRow2Col]}>
                        <View style={styles.ratingCircle}>
                            <Text style={{ color: "black" }} >{props.rating}</Text>
                        </View>
                        <AntDesign name="heart" size={24} color="#F55064" />


                    </View>
                </View>

            </View>
        )
    } else if (props.type == "food") {
        return (
            <View style={styles.FoodCardContainer}>
                <View style={styles.FoodCardContainerRow1}></View>
            </View>
        )
    } else if (props.type == "empty") {
        return (
            <View style={{
                width: "100%",
                height: 200
            }}>
                <View style={styles.FoodCardContainerRow1}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    StoreCardContainer: {
        height: 200,
        width: Dimensions.get("screen").width / 1.1,
        marginLeft: 0,
        marginBottom: 4
    },
    StoreCardContainerRow1: {
        width: "100%",
        height: "75%",
        borderRadius: 14,
        justifyContent: "center",


    },
    StoreCardContainerRow2: {
        flexDirection: "row"
    },
    StoreCardContainerRow2Col: {
        width: "84%",
        height: "100%"
    },
    StoreCardStoreName: {
        fontFamily: "Poppins-semibold",
    },
    StoreCardStoreAddress: {
        fontFamily: "Poppins-regular"
    },
    ratingCircle: {
        backgroundColor: "#76B693",
        height: 30,
        width: 30,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        right: 10
    },
    Row2: {
        width: "100%",
        height: "85%",
        backgroundColor: "tomato",
        justifyContent: "center"
    },
    FoodCardContainer: {
        backgroundColor: "green",
        height: 200,
        width: Dimensions.get("screen").width / 1.1,
        marginLeft: 0,
        borderRadius: 25,
        marginBottom: 4
    },
    FoodCardContainerRow1: {
        width: "100%",
        height: "15%",
        justifyContent: "center"
    },
})