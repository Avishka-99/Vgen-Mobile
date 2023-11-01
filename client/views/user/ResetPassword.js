import React, {useEffect} from 'react';
import {useState} from 'react';
import {View, Keyboard, Text, KeyboardAvoidingView, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, StatusBar, TouchableNativeFeedback} from 'react-native';
import {Image} from 'expo-image';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import Button from '../../components/Button';
import {OtpInput} from 'react-native-otp-entry';
import {useSelector} from 'react-redux';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import TextInputField from '../../components/TextInputField';
export default function ResetPassword({navigation}) {
	useEffect(() => {
		Keyboard.dismiss;
	});
	//  const [otp, setOtp] = useState('');
	const [email, setEmail] = useState('');
	//console.log(otp);
	const otpEmail = useSelector((state) => state.userReducer.otpEmail);
	const FrogetPasswordView = () => {
		// console.log(name)
		navigation.navigate('FrogetPassword');
	};
	const toastConfig = {
		success: (props) => (
			<BaseToast
				{...props}
				style={{borderLeftColor: '#34A853'}}
				text1Style={{
					fontSize: 15,
					fontWeight: '400',
				}}
				text2Style={{
					fontSize: 15,
					fontWeight: '400',
				}}
			/>
		),
		error: (props) => (
			<ErrorToast
				{...props}
				text1Style={{
					fontSize: 12,
					fontWeight: '400',
				}}
				text2Style={{
					fontSize: 12,
					fontWeight: '400',
					color: 'black',
				}}
			/>
		),
		warning: ({text1, props}) => (
			<View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
				<Text>{text1}</Text>
				<Text>{props.uuid}</Text>
			</View>
		),
	};
	const showToast = (type, message, message_2, duration) => {
		Toast.show({
			type: type,
			text1: message,
			text2: message_2 ? message_2 : '',
			visibilityTime: duration ? duration : 4000,
			// text2: 'This is some something 👋',
		});
	};
	const handleSubmit = (e) => {
		// console.log(otp);
		// Axios.post(API_ENDPOINTS.VERIFY_USER_URL, {
		// 	email: otpEmail,
		// 	otp: otp,
		// }).then((response) => {
		// 	if (response.data == 'OTP matched') {
		// 		showToast('success', 'Account verified successfully', '', 2000);
		// 		//ToastMessages.info('Redirecting to homepage');
		// 		setTimeout(function () {
		// 			navigation.navigate('SignIn');
		// 		}, 3000);
		// 	} else if (response.data == 'Invalid OTP') {
		// 		showToast('success', 'Invalid OTP', '', 1000);
		// 	}
		// 	console.log(response.data);
		// });
		navigation.navigate('Otpcode');
	};
	const sendEmail = () => {};
	// return(
	// 	<View>
	// 		<View style={{flex: 1, justifyContent: 'space-between'}}>
	//  			<Image style={styles.image} source={require('../../assets/vf-bg.png')} contentFit='cover' />
	//  			<View style={{width: Dimensions.get('window').width, height: '65%', alignItems: 'center', opacity: 9, justifyContent: 'space-evenly'}}>
	//  				<Text style={{fontSize: 25, color: '#7EB693', fontFamily: 'Yellowtail-Regular', fontWeight: 600}}>Secure Your Vegan Journey</Text>
	//  				<Text style={{fontSize: 25, color: '#274C5B', fontFamily: 'Poppins-ExtraBold', fontWeight: 600}}>Verify with OTP</Text>
	//  				<View style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, backgroundColor: 'white', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
	//  					<Image style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, borderRadius: 100}} source={require('../../assets/otp.png')} />
	//  				</View>
	//  				<Text style={{fontSize: 15, fontFamily: 'Poppins-regular'}}>Enter the OTP sent to</Text>
	//  				<Text style={{fontSize: 15, fontFamily: 'Poppins-regular', color: '#274C5B'}}>{otpEmail}</Text>
	//  			</View>
	//  			<View style={{width: Dimensions.get('window').width, height: '35%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}>
	//  				<OtpInput
	//  					numberOfDigits={6}
	//  					focusColor='#7EB693'
	//  					onTextChange={setOtp}
	//  					theme={{
	//  						containerStyle: styles.containerStyle,
	//  						inputsContainerStyle: styles.inputStyle,
	//  						pinCodeContainerStyle: styles.pincodecontainerStyle,
	//  						pinCodeTextStyle: styles.pincodetextStyle,
	//  						focusStickStyle: styles.focusStick,
	//  					}}
	//  					focusStickBlinkingDuration={500}
	//  				/>
	//  				<Button func={handleSubmit} butname={'Verify'} />
	//  			</View>
	//  			<Toast config={toastConfig} />
	//  		</View>
	// 	</View>
	// )
	return (
		<TouchableNativeFeedback onPress={Keyboard.dismiss}>
			<View style={{flex: 1}}>
				<Image style={styles.image} source={require('../../assets/vf-bg.png')} contentFit='cover' />
				{/* <View><Header  func={FrogetPasswordView}/></View>  */}
				<View style={{width: Dimensions.get('window').width, height: '55%', alignItems: 'center', opacity: 9, justifyContent: 'space-evenly'}}>
					<Text style={{fontSize: 25, color: '#274C5B', fontFamily: 'Poppins-ExtraBold', fontWeight: 600}}>Enter new password</Text>
					<View style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, backgroundColor: 'white', borderRadius: 100, alignItems: 'center', justifyContent: 'center'}}>
						<Image style={{width: Dimensions.get('window').width / 2, height: Dimensions.get('window').width / 2, borderRadius: 100}} source={require('../../assets/otp.png')} />
					</View>
				</View>
				<View style={{width: Dimensions.get('window').width, height: '35%', marginTop: 0, alignItems: 'center', justifyContent: 'center'}}>
					{/* <OtpInput
						numberOfDigits={6}
						focusColor='#7EB693'
						onTextChange={setOtp}
						theme={{
							containerStyle: styles.containerStyle,
							inputsContainerStyle: styles.inputStyle,
							pinCodeContainerStyle: styles.pincodecontainerStyle,
							pinCodeTextStyle: styles.pincodetextStyle,
							focusStickStyle: styles.focusStick,
						}}
						focusStickBlinkingDuration={500}
					/> */}
					<TextInputField placeholder='New password' />
					<TextInputField placeholder='Confirm new passwrod' />
					<Button func={handleSubmit} butname={'Change password'} />
				</View>
				<Toast config={toastConfig} />
			</View>
		</TouchableNativeFeedback>
	);
}
const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		resizeMode: 'cover',
		position: 'absolute',
		opacity: 0.2,
	},
	containerStyle: {
		width: Dimensions.get('window').width / 1.05,
		height: Dimensions.get('window').height / 10,
	},
	inputStyle: {
		alignItems: 'center',
	},
	pincodecontainerStyle: {
		height: '80%',
		width: '14%',
		borderWidth: 2,
		borderColor: '#7EB693',
		backgroundColor: 'white',
	},
	pincodetextStyle: {},
	focusStick: {
		bacgroundColor: '#7EB693',
	},
});
//export default Otpcode;
