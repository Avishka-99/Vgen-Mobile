import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

export default function Cart() {
	const [isClick, setClick] = useState(false);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});
	return (
		<View style={styles.container}>
		</View>
	);
}
