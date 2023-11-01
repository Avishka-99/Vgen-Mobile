import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions, View, Animated} from 'react-native';
import * as Device from 'expo-device'
export default function Button(props) {
	return (
		<TouchableOpacity style={[styles.button,props.custermize]} onPress={() => props.func()}>
			<Text style={{color: 'white', fontWeight: 500, fontSize: 15}}>{props.butname}</Text>
		</TouchableOpacity>
	);
}
export function IconButton(props) {
	return (
		<View
			style={{
				paddingLeft: props.padding ? Dimensions.get('screen').width / 45 : 0,
			}}
		>
			<TouchableOpacity
				style={{
					width: Dimensions.get('screen').width / 3.6,
					height: '70%',
					borderColor: 'black',
					borderWidth: 2,
					justifyContent: 'center',
					flexDirection: 'row',
					alignItems: 'center',
					borderRadius: 400,
					alignSelf: 'flex-start',
					padding: 1,
				}}
				onPress={() => props.func()}
			>
				{props.iconProps && <props.name name={props.iconProps.name} size={props.iconProps.size ? props.iconProps.size : 25} color={props.iconProps.color ? props.iconProps.color : '#393E46'} />}

				<Text>{props.title}</Text>
			</TouchableOpacity>
		</View>
	);
}
export function HeartButton(props) {
	const [animation, setAnimation] = useState(new Animated.Value(0));
	useEffect(() => {
		console.log(animation);
		Animated.timing(animation, {
			toValue: 1,
			duration: 3000,
			useNativeDriver: false,
		}).start(() => {});
	}, []);
	const dimention = {
		width: animation.interpolate({
			inputRange: [0, 1],
			outputRange: [35, 30],
		}),
		height: animation.interpolate({
			inputRange: [0, 1],
			outputRange: [35, 30],
		}),
	};
	const stylesr = StyleSheet.create({
		container: {
			alignItems: 'center',
			justifyContent: 'center',
			height: 30,
			width: 30,
		},
		box: {
			borderTopLeftRadius: 15,
			borderTopRightRadius: 15,
			height: '100%',
			width: '100%',
		},
	});
	if (props.type == 'heart-border') {
		return (
			<TouchableOpacity onPress={() => props.onPress(props.type, props.data)}>
				<Animated.View style={[stylesr.container]}>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', position: 'absolute', right: '43%', borderRadius: 400, bottom: '43%', borderColor: '#F36B7E', borderWidth:Device.brand=='Apple'? '2%':5}}></View>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', position: 'absolute', left: '43%', borderRadius: 400, bottom: '43%', borderWidth:Device.brand=='Apple'? '2%':5, borderColor: '#F36B7E'}}></View>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', transform: 'rotate(45deg)', borderWidth:Device.brand=='Apple'? '2%':5, borderColor: '#F36B7E', borderLeftWidth: Device.brand=='Apple'? '0%':0, borderTopWidth:Device.brand=='Apple'? '0%':0}}></View>
					<View style={{width: '7%', height: '7%', backgroundColor: '#F36B7E', position: 'absolute', transform: 'rotate(45deg)', top: '15%'}}></View>
				</Animated.View>
			</TouchableOpacity>
		);
	} else if (props.type == 'heart-fill') {
		return (
			<TouchableOpacity onPress={() => props.onPress(props.type, props.data)}>
				<Animated.View style={[stylesr.container]}>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', transform: 'rotate(45deg)', backgroundColor: '#F36B7E'}}></View>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', transform: 'rotate(45deg)', position: 'absolute', right: '43%', borderRadius: 400, bottom: '43%', backgroundColor: '#F36B7E'}}></View>
					<View style={{width: '50%', height: '50%', backgroundColor: 'white', transform: 'rotate(45deg)', position: 'absolute', left: '43%', borderRadius: 400, bottom: '43%', backgroundColor: '#F36B7E'}}></View>
				</Animated.View>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	button: {
		width: 200,
		height: 50,
		borderRadius: 30,
		marginTop: 50,
		backgroundColor: '#7EB693',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom:2
	},
});
