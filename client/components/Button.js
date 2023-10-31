import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions, View} from 'react-native';

export default function Button(props) {
	//console.log(props)
	return (
		<TouchableOpacity style={[styles.button,props.custermize]} onPress={() => props.func()}>
			<Text style={{color: 'white', fontWeight: 500, fontSize: 20}}>{props.butname}</Text>
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
					borderRadius: '100%',
					alignSelf:'flex-start',
					padding:1,
				}}
				onPress={() => props.func()}
			>
				{props.iconProps && <props.name name={props.iconProps.name} size={props.iconProps.size ? props.iconProps.size : 25} color={props.iconProps.color ? props.iconProps.color : '#393E46'} />}

				<Text >{props.title}</Text>
			</TouchableOpacity>
		</View>
	);
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
	},
});
