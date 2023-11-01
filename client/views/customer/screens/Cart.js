import {View, Text, StyleSheet} from 'react-native';
import React, {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Axios from '../../../api/Axios';


export default function Cart() {
	const [isClick, setClick] = useState(false);
	const cart = useSelector((state)=>state.userReducer.cart);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
	useEffect(()=>{
		Axios.post('/api/getallproducts').then(((response)=>{
			console.log(response.data)
		}));
	})
	return (
		<View style={styles.container}>
			{cart && cart.length>0 && <Text>{cart[0].id}</Text>}
		</View>
	);
}
