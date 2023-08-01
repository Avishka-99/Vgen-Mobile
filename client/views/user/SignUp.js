import {View, Text, StyleSheet, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'expo-image';
import {RadioButton} from 'react-native-paper';
import Constants from 'expo-constants';
import TextInputField from '../../components/TextInputField';
import * as Icons from '../../constants/Icons';
import RoundedButton from '../../components/RoundedButton';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Axios from '../../api/Axios';
export default function SignUp({navigation}) {
	const [checked, setChecked] = useState('first');
	const [email, setEmail] = useState('');
	const [nic, setNic] = useState('');
	const [name, setName] = useState('');
	const [firstName, setfirstName] = useState('');
	const [lastName, setlastName] = useState('');
	const [userRole, setuserRole] = useState('Customer');
	const [profilePicture, setProfilePicture] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [contactNo, setContactNo] = useState('');
	console.log(password);
	const toastConfig = {
		/*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
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
		/*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
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
		/*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
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
	const checkPasswordStrength = () => {
		var strength = 0;
		if (password.match(/[a-z]+/)) {
			strength += 1;
		}
		if (password.match(/[A-Z]+/)) {
			strength += 1;
		}
		if (password.match(/[0-9]+/)) {
			strength += 1;
		}
		if (password.match(/[$@#&!]+/)) {
			strength += 1;
		}
		if (password.length < 6) {
			showToast('error', 'Password should be atleast 6 characters long');
			//showToast('error', 'Password should contain atleast one lowercase', 'and uppercase letter,a digit ,a special character');
			return false;
		} else if (strength < 4) {
			showToast('error', 'Password should contain atleast one lowercase', 'and uppercase letter,a digit ,a special character');
			return false;
		} else {
			return true;
		}
	};
	const checkMail = () => {
		var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (email.match(mailformat)) {
			return true;
		} else {
			return false;
		}
	};
	const handleSubmit = () => {
		var isClean = true;

		if (firstName == '' || lastName == '' || nic == '' || contactNo == '' || email == '') {
			isClean = false;
			showToast('error', 'Please fill required fields');
		}
		if (firstName.length > 0 && lastName.length > 0 && nic.length > 0 && contactNo.length > 0 && email.length > 0) {
			if (password == '' && confirmpassword == '') {
				isClean = false;
				showToast('error', 'Please enter password');
			}
			if (password != confirmpassword) {
				isClean = false;
				showToast('error', 'Please check password');
			}
			if (!checkMail()) {
				showToast('error', 'Please enter valid email');
			}
			const passwordStrength = checkPasswordStrength();
			if (!passwordStrength) {
				isClean = false;
			}
		}
		if (isClean) {
			Axios.post(API_ENDPOINTS.SIGNUP_URL, {
				email: email,
				password: password,
				nic: nic,
				firstName: firstName,
				lastName: lastName,
				userRole: userRole,
				contactNo: contactNo,
				// profilePicture:profilePicture
			}).then((response) => {
				console.log(response.data);
				showToast(response.data);
			});
		}
	};
	return (
		<View style={styles.loginContainer}>
			<View style={{height: '15%'}}>
				<Text style={{fontFamily: 'Yellowtail-Regular', fontSize: 24, color: '#7EB693'}}>Embrace Your Vegan Journey</Text>
				<Text style={{fontFamily: 'Poppins-ExtraBold', fontSize: 32, color: '#274C5B'}}>Sign Up Today!</Text>
			</View>

			<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: '1.1%'}}>
				<TextInputField
					isSecured={false}
					textInputRow={{
						width: '49.3%',
					}}
					textInput={{
						paddingLeft: 18,
					}}
					iconType={Icons.Feather}
					iconProps={{name: 'user', size: 24, paddingleft: 19}}
					height='8%'
					placeholder='First name'
					function={setfirstName}
				/>
				<TextInputField
					isSecured={false}
					textInputRow={{
						width: '49.3%',
					}}
					textInput={{
						paddingLeft: 18,
					}}
					iconType={Icons.Feather}
					iconProps={{name: 'user', size: 24, paddingleft: 19}}
					height='8%'
					placeholder='Last name'
					function={setlastName}
				/>
			</View>
			<TextInputField isSecured={false} iconType={Icons.FontAwesome} iconProps={{name: 'id-badge', size: 24}} height='8%' placeholder='NIC' function={setNic} />
			<TextInputField isSecured={false} iconType={Icons.Feather} iconProps={{name: 'phone', size: 24}} height='8%' placeholder='Contact no' function={setContactNo} />
			<TextInputField isSecured={false} iconType={Icons.MaterialCommunityIcons} iconProps={{name: 'email-outline', size: 24}} height='8%' placeholder='Email' function={setEmail} />
			<TextInputField isSecured={true} iconType={Icons.Feather} iconProps={{name: 'lock', size: 24}} height='8%' placeholder='Password' function={setPassword} />
			<TextInputField isSecured={true} iconType={Icons.Feather} iconProps={{name: 'lock', size: 24}} height='8%' placeholder='Confirm password' function={setConfirmPassword} />

			<View style={styles.radioButtonContainer}>
				<RadioButton value='first' status={checked === 'first' ? 'checked' : 'unchecked'} onPress={() => setChecked('first')} />
				<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>Customer</Text>
				<RadioButton value='second' status={checked === 'second' ? 'checked' : 'unchecked'} onPress={() => setChecked('second')} />
				<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>Delivery</Text>
			</View>

			<TouchableOpacity style={styles.submitButton} activeOpacity={0.9} onPress={handleSubmit}>
				<RoundedButton width='100%' height='100%' color='#7EB693' function={handleSubmit} text='Sign up' />
			</TouchableOpacity>
			<Text style={styles.bottomText}>
				Already a member?{' '}
				<Text style={styles.signUptext} onPress={() => navigation.navigate('SignIn')}>
					Sign in
				</Text>
			</Text>
			<Toast config={toastConfig} />
		</View>
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
		marginTop: Constants.deviceName == 'iPhone' ? 0 : Constants.statusBarHeight,
	},
	logo: {
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '90%',
		height: '30%',
		marginTop: Constants.deviceName == 'iPhone' ? 0 : Constants.statusBarHeight,
		left: '5%',
		top: '3%',
	},
	loginContainer: {
		position: 'absolute',
		// top: "40%",
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput: {
		width: '80%',
		height: 40,
		marginBottom: '1%',
	},
	radioButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	submitButton: {
		position: 'relative',
		width: '80%',
		height: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '1%',
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Poppins-medium',
	},
	bottomText: {
		position: 'relative',
		fontFamily: 'Poppins-medium',
	},
	signUptext: {
		color: 'royalblue',
		textDecorationLine: 'underline',
		fontFamily: 'Poppins-medium',
	},
});
