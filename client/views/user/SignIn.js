import {View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, TextInput, Touchable} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'expo-image';
import * as Icons from '../../constants/Icons';
import Constants from 'expo-constants';
import {useDispatch, useSelector} from 'react-redux';
import {setUserAction} from '../../actions/UserAction';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import RoundedButton from '../../components/RoundedButton';
import TextInputField from '../../components/TextInputField';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
export default function SignIn({navigation}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// let [fontsLoaded] = useFonts({
	//   "Poppins": require('../../assets/fonts/Poppins-Light.ttf')
	// })
	//console.log(email)
	const dispatch = useDispatch();
	const handleSubmit = () => {
		//dispatch(setUserAction('delivery'))
		Axios.post(API_ENDPOINTS.SIGNIN_URL, {
			email: email,
			password: password,
		}).then((response) => {
			console.log(response.data);
			if (response.data.type) {
				dispatch(setUserAction(response.data.type));
			} else if (response.data == 'Not verified') {
				showToast('error', response.data, '', 2000);
				// ToastMessages.warning('Please verify your account');
				// ToastMessages.info('Redirectiong to OTP verification');
				//resetFormData();
				//setIsDisabled(true);
				//localStorage.setItem('otpemail', email);
				// setTimeout(function () {
				// 	navigate('/otp');
				// }, 3000);
			} else {
				showToast('error', response.data, '', 2000);
			}
			//console.log(response.data.type)
		});
		/*Axios.get("http://192.168.1.219:5000/api/get").then((response) => {
      console.log(response.data);
    });*/
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
				// style={{borderLeftColor: 'red'}}
				// contentContainerStyle={{backgroundColor: '#2B2730'}}
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
	return (
		// <KeyboardAvoidingView
		//   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		//   keyboardVerticalOffset={0}
		//   style={styles.avoidingView}>
		<View style={styles.container}>
			<Image style={styles.image} source={require('../../assets/vgen.png')} contentFit='cover' />
			<View style={styles.loginOuter2}>
				<View style={styles.loginOuter}>
					<View style={styles.loginContainer}>
						<Image style={styles.image_2} source={require('../../assets/vf-bg.png')} />
						<View style={{padding: '9%'}} />
						<TextInputField isSecured={false} iconType={Icons.Feather} iconProps={{name: 'user', size: 24}} placeholder='Email' function={setEmail} value={email} textInputStyles={{height: '15%'}} />
						<TextInputField isSecured={true} iconType={Icons.Feather} iconProps={{name: 'lock', size: 24}} placeholder='Password' function={setPassword} value={password} textInputStyles={{height: '15%'}} />
						<View style={styles.forgotPassword}>
							<Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('FrogetPassword')}>
								Forgot password?
							</Text>
						</View>
						<RoundedButton color='#7EB693' function={handleSubmit} text='Log in' />
						<Text style={styles.bottomText}>
							New to VGen?
							<Text style={styles.signUptext} onPress={() => navigation.navigate('SignUp')}>
								Sign up
							</Text>
						</Text>
					</View>
				</View>
			</View>
			<Toast config={toastConfig} />
		</View>
		// </KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	avoidingView: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		// marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
	},
	image_2: {
		flex: 1,
		resizeMode: 'repeat',
		position: 'absolute',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		opacity: 0.2,
	},
	logo: {
		flex: 1,
		position: 'absolute',
		width: '90%',
		height: '30%',
		marginTop: Constants.deviceName == 'iPhone' ? 0 : Constants.statusBarHeight,
		left: '5%',
		top: '12%',
	},
	loginOuter2: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		height: '50%',
		backgroundColor: '#B9DB7E',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	loginOuter: {
		position: 'relative',
		top: '4%',
		width: '100%',
		height: '100%',
		backgroundColor: '#7EB694',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
	},
	loginContainer: {
		position: 'relative',
		top: '4%',
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		alignItems: 'center',
	},
	textInputRow: {
		top: '5%',
		width: '80%',
		flexDirection: 'row',
		marginBottom: '2%',
		height: '12%',
		backgroundColor: 'white',
		borderColor: '#7EB693',
		borderWidth: 1,
		alignItems: 'center',
		padding: 3,
		borderRadius: 8,
		color: '#393E46',
	},
	textInput: {
		width: '80%',
		color: '#393E46',
		paddingLeft: 10,
	},
	forgotPassword: {
		display: 'flex',
		width: '80%',
		position: 'relative',
		top: '5%',
		fontFamily: 'Poppins-medium',
		textAlign: 'right',
	},
	forgotPasswordText: {
		color: '#ADACAA',
		textDecorationLine: 'underline',
		fontFamily: 'Poppins-medium',
		textAlign: 'right',
		marginBottom: '2%',
	},
	submitButtonContainer: {
		position: 'relative',
		backgroundColor: '#7EB693',
		color: 'white',
		borderRadius: 50,
		width: '70%',
		height: '15%',
		justifyContent: 'center',
		alignItems: 'center',
		top: '5%',
	},
	submitButton: {
		position: 'relative',
		color: 'white',
		borderRadius: 50,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Poppins-medium',
	},
	bottomText: {
		position: 'relative',
		top: '5%',
		fontFamily: 'Poppins-regular',
		color: '#7D7D7D',
	},
	signUptext: {
		color: '#7EB693',
		textDecorationLine: 'underline',
		fontFamily: 'Poppins-semibold',
		fontSize: 14,
		marginLeft: 10,
	},
});
