import {View, Text, StyleSheet} from 'react-native';
import React, {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';


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

	})
	return (
		<View style={styles.container}>
			{cart&& <Text>{cart[0].id}</Text>}
		</View>
	);
}
