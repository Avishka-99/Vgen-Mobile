import {View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform, Touchable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import Constants from 'expo-constants';
import TextInputField from '../../components/TextInputField';
import * as Icons from '../../constants/Icons';
import RoundedButton from '../../components/RoundedButton';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Axios from '../../api/Axios';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import {useDispatch, useSelector} from 'react-redux';
import {setOtpEmail} from '../../actions/UserAction';
import {Button, Modal} from 'react-native-paper';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import {signup} from '../../constants/Localizations';
import {I18n} from 'i18n-js';
import MarqueeView from 'react-native-marquee-view';
import {setUserLanguage} from '../../actions/UserAction';
import * as Device from 'expo-device';
import * as Haptics from 'expo-haptics';
import {setUserLocation} from '../../actions/UserAction';
export default function SignUp({navigation}) {
	const [checked, setChecked] = useState('first');
	const [email, setEmail] = useState('');
	const [nic, setNic] = useState('');
	const [name, setName] = useState('');
	const [firstName, setfirstName] = useState('');
	const [lastName, setlastName] = useState('');
	const [userRole, setuserRole] = useState('Customer');
	const [profilePicture, setProfilePicture] = useState('');
	const [password, setPassword] = useState('@');
	const [confirmpassword, setConfirmPassword] = useState('@');
	const [contactNo, setContactNo] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [location, setLocation] = useState();
	const [region, setRegion] = useState();
	const [language, setLanguage] = useState('en');
	const currentLocation = useSelector((state) => state.userReducer.userLocation);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			let {status} = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			let locale = await AsyncStorage.getItem('locale').then((response) => {
				//console.log(typeof response);
				if (response) {
					dispatch(setUserLanguage(response));
				} else {
					dispatch(setUserLanguage('en'));
				}
			});
			let currentLocation = await Location.getCurrentPositionAsync({});
			dispatch(setUserLocation(currentLocation));
			setLocation(currentLocation);
		})();
	}, []);
	//const locale = useSelector((state) => state.userReducer.userLanguage);
	const locale = language;
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
	console.log(currentLocation.coords);
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
	const handleSubmit = async () => {
		//navigation.navigate('Otpcode');
		console.log(location);
		var isClean = true;
		var lat = 0;
		var long = 0;
		if (region) {
			lat = region.latitude;
			long = region.longitude;
		} else if (location) {
			lat = location.coords.latitude;
			long = location.coords.longitude;
		} else {
			showToast('info', 'Please wait until location is fetched', '', 2000);
			isClean = false;
			return;
		}
		console.log(lat);
		console.log(long);
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
				latitude: lat,
				longitude: long,
				// profilePicture:profilePicture
			}).then((response) => {
				if (response.data.type == 'error') {
					showToast(response.data.type, response.data.message, '', 2000);
				} else {
					AsyncStorage.setItem('locale', language);
					dispatch(setOtpEmail(email));
					navigation.navigate('Otpcode');
				}
			});
		}
	};
	const openModal = () => {
		//console.log(location);
		setIsModalVisible(!isModalVisible);
	};
	const changeLocale = (value) => {
		const localeList = ['en', 'si', 'ta'];
		const newLocale = localeList[(localeList.indexOf(locale) + 1) % 3];
		setLanguage(localeList[(localeList.indexOf(locale) + 1) % 3]);
		//AsyncStorage.setItem('locale', newLocale);
		//dispatch(setUserLanguage(localeList[(localeList.indexOf(locale) + 1) % 3]));
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};
	//console.log(location);
	const i18n = new I18n(signup);
	i18n.enableFallback = true;
	i18n.locale = locale;
	return (
		<View style={styles.loginContainer}>
			<View style={{height: '8%', width: '100%', alignItems: 'flex-end', justifyContent: 'center'}}>
				<TouchableOpacity activeOpacity={0.3} onPress={changeLocale}>
					<View style={{height: '80%', width: '38%', justifyContent: 'center', flexDirection: 'row', marginRight: '2%'}}>
						<View style={{width: '30%', height: '100%', backgroundColor: '#7EB693', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 400, borderBottomLeftRadius: 400}}>
							<Icons.FontAwesome5 name='globe-asia' size={27} color='#274C5B' />
						</View>
						<View style={[{width: '50%', height: '100%', backgroundColor: '#7EB693', borderTopRightRadius: 400, borderBottomRightRadius: 400, justifyContent: 'center', fontFamily: 'Yellowtail-Regular'}]}>
							<Text style={styles.localeText}>{i18n.t('locale')}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			<View style={{height: '15%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontFamily: 'Yellowtail-Regular', fontSize: 24, color: '#7EB693'}}>Embrace Your Vegan Journey</Text>
				<Text style={{fontFamily: 'Poppins-ExtraBold', fontSize: 32, color: '#274C5B'}}>Sign Up Today!</Text>
			</View>
			<View style={{alignItems: 'center', justifyContent: 'center'}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginBottom: '1.1%'}}>
					<TextInputField
						isSecured={false}
						textInputRow={{
							width: '49.3%',
							height: Device.brand == 'Apple' ? 45 : 45,
						}}
						textInput={{
							paddingLeft: 18,
						}}
						iconType={Icons.Feather}
						iconProps={{name: 'user', size: 24, paddingleft: 19}}
						height='8%'
						placeholder={i18n.t('firstname')}
						function={setfirstName}
						value={firstName}
					/>
					<TextInputField
						isSecured={false}
						textInputRow={{
							width: '49.3%',
							height: 45,
						}}
						textInput={{
							paddingLeft: 18,
						}}
						iconType={Icons.Feather}
						iconProps={{name: 'user', size: 24, paddingleft: 19}}
						height='8%'
						placeholder={i18n.t('lastname')}
						function={setlastName}
						value={lastName}
					/>
				</View>
				<TextInputField textInputRow={{height: 45, marginBottom: 4}} isSecured={false} iconType={Icons.FontAwesome} iconProps={{name: 'id-badge', size: 24}} height='8%' placeholder={i18n.t('nic')} function={setNic} value={nic} />
				<TextInputField textInputRow={{height: 45, marginBottom: 4}} isSecured={false} iconType={Icons.Feather} iconProps={{name: 'phone', size: 24}} height='8%' placeholder={i18n.t('contactno')} function={setContactNo} value={contactNo} />
				<TextInputField textInputRow={{height: 45, marginBottom: 4}} isSecured={false} iconType={Icons.MaterialCommunityIcons} iconProps={{name: 'email-outline', size: 24}} height='8%' placeholder={i18n.t('email')} function={setEmail} value={email} />
				<TextInputField textInputRow={{height: 45, marginBottom: 4}} isSecured={true} iconType={Icons.Feather} iconProps={{name: 'lock', size: 24}} height='8%' placeholder={i18n.t('password')} function={setPassword} value={password} />
				<TextInputField textInputRow={{height: 45, marginBottom: 4}} isSecured={true} iconType={Icons.Feather} iconProps={{name: 'lock', size: 24}} height='8%' placeholder={i18n.t('confirmpassword')} function={setConfirmPassword} value={confirmpassword} />
				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '95%'}}>
					{locale == 'ta' ? (
						<TouchableWithoutFeedback onPress={openModal}>
							<View
								style={{
									backgroundColor: '#7EB693',
									padding: 10,
									borderRadius: 45,
								}}
							>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: 'white'}}>{i18n.t('picklocation')}</Text>
							</View>
						</TouchableWithoutFeedback>
					) : (
						<Button mode='contained' onPress={openModal} buttonColor='#7EB693' labelStyle={{fontFamily: 'Poppins-semibold', fontSize: 14}}>
							{i18n.t('picklocation')}
						</Button>
					)}
					{/* <Button mode='contained' onPress={openModal} buttonColor='#7EB693' labelStyle={{fontFamily: 'Poppins-semibold', fontSize: 14}}>
					{i18n.t('picklocation')}
				</Button> */}
					{location && (locale == 'si' || locale == 'en') ? (
						<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#274C5B'}}>{i18n.t('fetchedlocation2')}</Text>
					) : location && locale == 'ta' ? (
						<View>
							<MarqueeView
								style={{
									width: 150,

									alignItems: 'center',
									justifyContent: 'center',
									alignContent: 'center',
								}}
							>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#274C5B'}}>{i18n.t('fetchedlocation')}</Text>
							</MarqueeView>
						</View>
					) : locale == 'ta' ? (
						<View>
							<MarqueeView
								style={{
									width: 150,
									alignItems: 'center',
								}}
							>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#274C5B'}}>{i18n.t('currentlocation')}</Text>
							</MarqueeView>
						</View>
					) : locale == 'si' ? (
						<View>
							<MarqueeView
								style={{
									width: 150,
									alignItems: 'center',
								}}
							>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#274C5B'}}>{i18n.t('currentlocation')}</Text>
							</MarqueeView>
						</View>
					) : (
						<Text style={{fontFamily: 'Poppins-semibold', fontSize: 14, color: '#274C5B'}}>{i18n.t('currentlocation')}</Text>
					)}
				</View>

				<View style={styles.radioButtonContainer}>
					<RadioButton value='first' status={userRole === 'Customer' ? 'checked' : 'unchecked'} onPress={() => setuserRole('Customer')} />
					<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>{i18n.t('customer')}</Text>
					<RadioButton value='second' status={userRole === 'Delivery' ? 'checked' : 'unchecked'} onPress={() => setuserRole('Delivery')} />
					<Text style={{marginRight: '4%', fontFamily: 'Poppins-medium'}}>{i18n.t('delivery')}</Text>
				</View>
			</View>
			<TouchableOpacity style={styles.submitButton} activeOpacity={0.9} onPress={handleSubmit}>
				<RoundedButton width='80%' height='100%' color='#7EB693' function={handleSubmit} text={i18n.t('signup')} />
			</TouchableOpacity>
			<View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={styles.bottomText}>
					{i18n.t('alreadyamember')}{' '}
					<Text
						style={styles.signUptext}
						onPress={() => {
							dispatch(setUserLocation({}));
							navigation.navigate('SignIn');
						}}
					>
						{i18n.t('signin')}
					</Text>
				</Text>
			</View>

			<Toast config={toastConfig} />
			<Modal
				dismissable={true}
				visible={isModalVisible}
				onDismiss={openModal}
				contentContainerStyle={{
					backgroundColor: 'white',
					width: Dimensions.get('screen').width / 1.1,
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					borderRadius: 10,
					height: Dimensions.get('screen').height / 1.5,
				}}
			>
				<View style={{height: '100%', width: '100%'}}>
					<View style={{width: '100%', height: '11%', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between'}}>
						<TouchableWithoutFeedback onPress={openModal} style={{padding: 5}}>
							<View style={{borderRadius: 40, width: 40, height: 40, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
								<Icons.EvilIcons name='close' size={30} color={'white'} />
							</View>
						</TouchableWithoutFeedback>
						<Text style={{right: 5, fontFamily: 'Poppins-semibold', fontSize: 18, color: '#7EB693'}}>Pick a location</Text>
					</View>
					<MapView
						initialRegion={{
							latitude: 8.298141,
							longitude: 80.448036,
							latitudeDelta: 0.0002,
							longitudeDelta: 0.0131,
						}}
						style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}
						onRegionChange={setRegion}
					>
						<Marker
							coordinate={{
								latitude: region ? region.latitude : 5.298141,
								longitude: region ? region.longitude : 84.448036,
							}}
						></Marker>
						{/* <View style={{width: '10%', height: '10%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'none'}}>
							<Icons.FontAwesome5 name='map-pin' size={35} />
						</View> */}
					</MapView>
				</View>
			</Modal>
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
		marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
	},
	logo: {
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '90%',
		height: '30%',
		marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight,
		left: '5%',
		top: '3%',
	},
	loginContainer: {
		position: 'absolute',
		// top: "40%",
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
	},
	textInput: {
		width: '80%',
		height: 40,
		marginBottom: '1%',
	},
	radioButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	submitButton: {
		position: 'relative',
		width: '100%',
		height: '6%',
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
		fontFamily: 'Poppins-semibold',
		color: '#7EB693',
	},
	localeText: {
		fontFamily: 'Poppins-semibold',
		color: '#274C5B',
	},
});
