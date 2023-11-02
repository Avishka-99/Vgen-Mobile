import {View, Text, StyleSheet, Button, Switch, Dimensions, Image} from 'react-native';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUserAction} from '../../../actions/UserAction';
import Card from '../../../components/Card';
import {Divider} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import {CreateCommunityBottomSheet, ProfileBottomSheet} from '../../../components/Bottomsheet';
import Backdrop from '../../../components/Backdrop';
import {NGROK_URL} from '../../../constants/Constants';
import {CATEGORY_IMG_PATH} from '../../../constants/Constants';
import {LinearGradient} from 'expo-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import userReducer from '../../../reducers/userReducer';
import {MaterialIcons} from '@expo/vector-icons';
import Axios from '../../../api/Axios';
import * as Icons from '../../../constants/Icons';
import {I18n} from 'i18n-js';
import {menu} from '../../../constants/Localizations';
import {setUserLanguage} from '../../../actions/UserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints';
export default function Menu() {
	const [isEnabled, setIsEnabled] = useState(false);
	const [load, setLoad] = useState(true);
	const [userName, setUsername] = useState();
	const user_id = useSelector((state) => state.userReducer.userid);
	const locale = useSelector((state) => state.userReducer.userLanguage);
	// useEffect(() => {
	// 	Axios.post(API_ENDPOINTS.FETCH_PROFILE).then((result) => {
	// 		dispatch(ALL_ACTIONS.setAllProducts(result.data));
	// 	});
	// }, []);
	const toggleSwitch = () => {
		Axios.post('/api/requestcommunityorganizer', {
			user_id: user_id,
		}).then((response) => {
			console.log(response.data);
		});
	};
	const dispatch = useDispatch();
	const styles = StyleSheet.create({
		container: {
			flex: 1,

			backgroundColor: 'white',
		},
	});
	const profileSheetModalRef = useRef(null);
	const communitySheetRef = useRef(null);
	const snapPoints = useMemo(() => ['98%'], []);
	const openProfileSheet = (data) => {
		// Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
		// 	const newFoods = result.data.filter((item) => filterArrayByCategory(item, data));
		// 	setOption('all');
		// 	setFoods(newFoods);
		// 	setSheetFoods(newFoods);
		// 	//dispatch(ALL_ACTIONS.setAllProducts(result.data));
		// 	//allFoods = useSelector((state) => state.userReducer.allProducts);
		// });
		// setSheetTitle(data);
		profileSheetModalRef.current.present();
	};
	const openCommunitySheet = (data) => {
		// Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
		// 	const newFoods = result.data.filter((item) => filterArrayByCategory(item, data));
		// 	setOption('all');
		// 	setFoods(newFoods);
		// 	setSheetFoods(newFoods);
		// 	//dispatch(ALL_ACTIONS.setAllProducts(result.data));
		// 	//allFoods = useSelector((state) => state.userReducer.allProducts);
		// });
		// setSheetTitle(data);
		communitySheetRef.current.present();
	};
	const changeLocale = async (value) => {
		const localeList = ['en', 'si', 'ta'];
		const newLocale = localeList[(localeList.indexOf(locale) + 1) % 3];
		//setLanguage(localeList[(localeList.indexOf(locale) + 1) % 3]);
		//AsyncStorage.setItem('locale', newLocale);
		AsyncStorage.setItem('locale', newLocale).then(() => {
			dispatch(setUserLanguage(localeList[(localeList.indexOf(locale) + 1) % 3]));
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		});
	};
	const CloseModal = (type) => {
		if (type == 'profile') {
			profileSheetModalRef.current.close();
		} else if (type == 'community') {
			communitySheetRef.current.close();
		}
	};
	useEffect(() => {
		async function fetchUserData() {
			if (user_id) {
				Axios.post(API_ENDPOINTS.GET_USER_PROFILE, {
					userId: user_id,
				}).then((response) => {
					console.log(response.data);
					setUsername(response.data[0].firstName + ' ' + response.data[0].lastName);
					console.log(userName);
				});
			}
		}
		fetchUserData();
	});
	const i18n = new I18n(menu);
	i18n.enableFallback = true;
	i18n.locale = locale;
	return (
		<View style={styles.container}>
			<Card type='profile' openModal={openProfileSheet} text={i18n.t('profile')} name={userName} />
			<Divider
				style={{
					width: '96%',
					left: '2%',
				}}
			/>
			{/* <View
				style={{
					height: '8%',
					width: '100%',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<View
					style={{
						width: '47%',
					}}
				>
					<Text
						style={{
							fontFamily: 'Poppins-medium',
						}}
					>
						Enroll as event organizer
					</Text>
				</View>
				<View
					style={{
						width: '47%',
						alignItems: 'flex-end',
					}}
				>
					<Button onPress={toggleSwitch} title='Click me'></Button>
				</View>
			</View>
			<Divider
				style={{
					width: '96%',
					left: '2%',
				}}
			/> */}
			{/* <View
				style={{
					height: '8%',
					width: '100%',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<View
					style={{
						width: '47%',
					}}
				>
					<Text
						style={{
							fontFamily: 'Poppins-medium',
						}}
					>
						{i18n.t('changelanguage')}
					</Text>
				</View>
				<View
					style={{
						width: '47%',
						height: '70%',
					}}
				>
					<TouchableOpacity activeOpacity={0.3} onPress={changeLocale}>
						<View style={{height: '100%', width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginRight: '2%'}}>
							<View style={{width: '22%', height: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 400, borderBottomLeftRadius: 400, borderColor: 'black', borderLeftWidth: '2px', borderTopWidth: '2px', borderBottomWidth: '2px'}}>
								<Icons.FontAwesome5 name='globe-asia' size={27} color='black' />
							</View>
							<View style={[{width: '40%', height: '100%', backgroundColor: 'white', borderTopRightRadius: 400, borderBottomRightRadius: 400, justifyContent: 'center', fontFamily: 'Yellowtail-Regular', borderRightWidth: '2px', borderTopWidth: '2px', borderBottomWidth: '2px'}]}>
								<Text style={{fontFamily: 'Poppins-semibold'}}>{i18n.t('locale')}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</View> */}
			{/* <Divider
				style={{
					width: '96%',
					left: '2%',
				}}
			/> */}
			{/* <TouchableOpacity
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					width: '100%',
					top: '2%',
				}}
				activeOpacity={0.9}
				onPress={() => openCommunitySheet()}
			>
				<View
					style={{
						width: '96%',
						height: Dimensions.get('screen').width / 4,
						borderRadius: '7em',
						backgroundColor: '#efefef',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						style={{
							height: '100%',
							width: '98%',
						}}
						source={{uri: NGROK_URL + CATEGORY_IMG_PATH + 'community.png'}}
						contentFit='cover'
						resizeMode='contain'
						onLoadEnd={() => setLoad(false)}
					/>
					<LinearGradient style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '7em'}} colors={['transparent', 'rgba(0,0,0,0.8)']}>
						<View
							style={{
								width: '100%',
								height: '100%',
							}}
						>
							<Text style={{position: 'absolute', top: '75%', left: '3%', fontFamily: 'Poppins-regular', color: 'white'}}>{i18n.t('createcommunity')}</Text>
						</View>
					</LinearGradient>
				</View>
			</TouchableOpacity> */}
			{/* <View
				style={{
					width: '100%',
					flexDirection: 'row',
					marginTop: '4%',
				}}
			>
				<View
					style={{
						width: Dimensions.get('screen').width / 4,
						height: Dimensions.get('screen').width / 4,
						borderRadius: '7em',
						backgroundColor: 'red',
					}}
				></View>
				<View
					style={{
						width: Dimensions.get('screen').width / 4,
						height: Dimensions.get('screen').width / 4,
						borderRadius: '7em',
						backgroundColor: 'red',
					}}
				></View>
			</View> */}
			<Button
				title='Log out'
				onPress={() => {
					dispatch(setUserAction(''));
				}}
			></Button>
			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={profileSheetModalRef} index={0} snapPoints={snapPoints}>
					<ProfileBottomSheet CloseModal={CloseModal} />
				</BottomSheetModal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={communitySheetRef} index={0} snapPoints={snapPoints}>
					<CreateCommunityBottomSheet CloseModal={CloseModal} />
				</BottomSheetModal>
				{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
			</Portal>
			<PortalHost name='category_main' />
		</View>
	);
}
