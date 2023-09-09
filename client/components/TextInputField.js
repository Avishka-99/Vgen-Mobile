import {StyleSheet, TextInput, View, Dimensions, Keyboard} from 'react-native';
import React, {useRef, useEffect} from 'react';
import * as Device from 'expo-device';
export default function TextInputField(props) {
	const localInputRef = useRef(null);

	const keyboardDidHideCallback = () => {
		localInputRef.current.blur?.();
	};

	useEffect(() => {
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback);

		return () => {
			keyboardDidHideSubscription?.remove();
		};
	}, []);
	const styles = StyleSheet.create({
		Container: {
			top: props.textInputRow ? (props.textInputRow.top ? props.textInputRow.top : 0) : 0,
			marginBottom: props.textInputRow ? (props.textInputRow.marginBottom ? props.textInputRow.marginBottom : 0) : 5,
			width: props.textInputRow ? (props.textInputRow.width ? props.textInputRow.width : '95%') : '95%',
			flexDirection: 'row',
			height: props.textInputRow ? (props.textInputRow.height ? props.textInputRow.height : 60) : 60,
			backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
			borderColor: '#7EB693',
			borderWidth: props.boderWidth ? props.boderWidth : 1,
			alignItems: 'center',
			justifyContent: 'center',
			padding: 3,
			//marginTop:16,
			borderRadius: props.textInputRow ? (props.textInputRow.borderRadius ? props.textInputRow.borderRadius : 8) : 8,
			color: '#393E46',
			// height: props.textInputRow.height ? props.textInputRow.height : 10,
			flexDirection: props.textInputRow ? (props.textInputRow.reverse ? 'row-reverse' : 'row') : 'row',
		},
		textInput: {
			// width: Device.brand=="Apple"?props.textInput ?props.textInput.width ? props.textInput.width :"90%":"90%":9,
			color: '#393E46',
			paddingLeft: props.textInput ? (props.textInput.paddingLeft ? props.textInput.paddingLeft : 10) : 10,
			width: Device.brand == 'Apple' ? (props.textInput ? (props.textInput.ioswidth ? props.textInput.ioswidth : '90%') : '90%') : '89%',
		},
		iconBackground: {
			height: Device.brand == 'Apple' ? Dimensions.get('screen').width / 9 : Dimensions.get('screen').width / 10,
			width: Device.brand == 'Apple' ? Dimensions.get('screen').width / 9 : Dimensions.get('screen').width / 10,
			backgroundColor: props.iconProps ? (props.iconProps.iconBg ? props.iconProps.iconBg : 'transparent') : 'transparent',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: props.iconProps ? (props.iconProps.radius ? props.iconProps.radius : 5) : 5,
			paddingLeft: props.iconProps ? (props.iconProps.paddingleft ? props.iconProps.paddingleft : 2) : 0,
		},
	});
	return (
		<View style={[styles.Container]}>
			<View style={styles.iconBackground}>{props.iconType ? <props.iconType name={props.iconProps.name} size={props.iconProps.size ? props.iconProps.size : 25} color={props.iconProps.color ? props.iconProps.color : '#393E46'} /> : <View></View>}</View>
			<TextInput
				ref={(ref) => {
					localInputRef && (localInputRef.current = ref);
				}}
				placeholder={props.placeholder}
				style={styles.textInput}
				onChangeText={(event) => props.function(event)}
				secureTextEntry={props.isSecured}
				placeholderTextColor={'#393E46'}
				selectionColor={'green'}
				value={props.value ? props.value : ''}
				onFocus={props.focusFunction ? props.focusFunction : () => {}}
				onBlur={props.blurFunction ? props.blurFunction : () => {}}
			/>
		</View>
	);
}
