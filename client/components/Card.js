import {StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {RESTAURANT_IMG_PATH, PRODUCT_IMG_PATH, CATEGORY_IMG_PATH, COMMUNITY_IMG_PATH} from '../constants/Constants';
import {BASE_URL} from '../constants/Constants';
import {NGROK_URL} from '../constants/Constants';
import {Chip, ActivityIndicator} from 'react-native-paper';
import Axios from '../api/Axios';
import {ScrollView} from 'react-native-gesture-handler';
import * as Icons from '../constants/Icons';
import * as Device from 'expo-device';
import {useSelector, useDispatch} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {HeartButton} from './Button';
import * as ALL_ACTIONS from '../actions/AllActions';
import * as API_ENDPOINTS from '../api/ApiEndpoints';
import * as Haptics from 'expo-haptics';
import { I18n } from 'i18n-js';
import { categoryBottomSheetLocale } from '../constants/Localizations';

export default function Card(props) {
	const locale = useSelector((state) => state.userReducer.userLanguage);
	const dispatch = useDispatch();
	const [btnType, setBtnType] = useState('heart-border');
	const user_id = useSelector((state) => state.userReducer.userid);
	const favdata = useSelector((state) => state.userReducer.favRestaurants);
	if (props.type == 'store') {
		const [load, setLoad] = useState(true);
		const [animation, setAnimation] = useState(new Animated.Value(0));

		useEffect(() => {
			Animated.timing(animation, {
				toValue: 1,
				duration: 3000,
				useNativeDriver: false,
			}).start(({finished}) => {
				if (finished && load) {
					// Animation has completed, you can restart it or do something else
					setAnimation(new Animated.Value(0)); // Reset the value
					//setTimeout(runAnimation, 1000); // Delay before restarting
				}
			});
		}, [animation]);
		const bgStyle = {
			backgroundColor: animation.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: ['rgba(255,99,71, 1)', 'rgba(255,99,71, 0)', 'rgba(255,99,71, 1)'],
			}),
		};

		const boxStyle = {
			backgroundColor: animation.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: ['rgb(127, 130, 135)', 'rgb(200,200,200)', 'rgb(127, 130, 135)'],
			}),
		};
		const stylesr = StyleSheet.create({
			container: {
				position: 'absolute',
				height: '100%',
				width: '100%',
				borderTopLeftRadius: 15,
				borderTopRightRadius: 15,
			},
			box: {
				borderTopLeftRadius: 15,
				borderTopRightRadius: 15,
				height: '100%',
				width: '100%',
			},
		});
		const changeButton = async (type, id) => {
			console.log(favdata);
			const tempFav = favdata.map((innerArray) => innerArray);
			console.log(tempFav);
			if (type == 'heart-border') {
				if (tempFav.indexOf(id) == -1) {
					tempFav.push(id);
					dispatch(ALL_ACTIONS.setFavRestaurants(tempFav));
				}
				Axios.post(API_ENDPOINTS.ADD_FAV_STORE, {
					user_id: user_id,
					data: tempFav,
				}).then((response) => {
					console.log(response);
				});
			} else {
				if (!(tempFav.indexOf(id) == -1)) {
					const newArr = tempFav.filter((item) => item != id);
					Axios.post(API_ENDPOINTS.ADD_FAV_STORE, {
						user_id: user_id,
						data: newArr,
					}).then((response) => {
						console.log(response);
					});
					dispatch(ALL_ACTIONS.setFavRestaurants(newArr));
					console.log(newArr);
				}
			}
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
			const btnTypes = ['heart-border', 'heart-fill'];
			setBtnType(btnTypes[(btnTypes.indexOf(type) + 1) % 2]);
		};
		return (
			<View style={styles.StoreCardContainer}>
				<TouchableWithoutFeedback onPress={() => props.onPress(props.details)}>
					<View style={styles.StoreCardContainerRow1}>
						<Image
							style={{
								height: '100%',
								width: '100%',
								borderTopLeftRadius: 15,
								borderTopRightRadius: 15,
							}}
							source={{uri: NGROK_URL + RESTAURANT_IMG_PATH + props.image}}
							onLoad={() => setLoad(false)}
						/>
						{load && (
							<Animated.View style={[stylesr.container, bgStyle]}>
								<Animated.View style={[stylesr.box, boxStyle]} />
							</Animated.View>
						)}
					</View>
				</TouchableWithoutFeedback>

				<View style={styles.StoreCardContainerRow2}>
					<TouchableWithoutFeedback onPress={() => props.onPress(props.details)}>
						<View style={styles.StoreCardContainerRow2Col}>
							<View>
								<Text style={styles.StoreCardStoreName}>{props.name}</Text>
							</View>
							<View>
								<Text style={styles.StoreCardStoreAddress}>{props.location}</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}, styles.StoreCardContainerRow2Col]}>
						{/* <View style={styles.ratingCircle}>
							<Text style={{color: 'black'}}>{props.rating}</Text>
						</View> */}
						<View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
							<HeartButton type={props.isFav ? 'heart-fill' : 'heart-border'} onPress={changeButton} data={props.details.restaurant_manager.resturantManagerId} />
						</View>
						{/* <AntDesign name={props.isFav ? 'heart' : 'hearto'} size={24} color='#F55064' /> */}
					</View>
				</View>
			</View>
		);
	} else if (props.type == 'food') {
		console.log(props.data);
		return (
			<TouchableWithoutFeedback onPress={() => props.openModal(props.data)}>
				<View style={styles.FoodCardContainer}>
					<View style={styles.FoodCardContainerCol1}>
						<Image
							style={{
								height: '94%',
								width: '98%',
								borderRadius:15,
							}}
							source={{uri: NGROK_URL + PRODUCT_IMG_PATH + props.data.productImage}}
						/>
					</View>
					<View style={styles.FoodCardContainerCol2}>
						<View style={{justifyContent: 'space-around', height: '100%'}}>
							<View style={{flexGrow: 1, flex: 1}}>
								<Text style={{fontFamily: 'Poppins-semibold', fontSize: 15}}>{props.data.productName}</Text>
								<Text style={{fontSize: 12, flexShrink: 1}}>{props.data.description}</Text>
							</View>
							<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#7EB693'}}>Rs.{props.data.sell_products[0].price.toFixed(2)}</Text>
						</View>
					</View>
					<View style={styles.FoodCardContainerCol3}>
						<Chip style={{marginTop: '12%'}}>
							<Text style={{fontSize: 11}}>Vegan</Text>
						</Chip>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	} else if (props.type == 'empty') {
		return (
			<View
				style={{
					width: '100%',
					height: Dimensions.get('screen').height / 30,
				}}
			></View>
		);
	} else if (props.type == 'community') {
		const [load, setLoad] = useState(true);
		const [animation, setAnimation] = useState(new Animated.Value(0));
		useEffect(() => {
			Animated.timing(animation, {
				toValue: 1,
				duration: 3000,
				useNativeDriver: false,
			}).start(({finished}) => {
				if (finished && load) {
					// Animation has completed, you can restart it or do something else
					setAnimation(new Animated.Value(0)); // Reset the value
					//setTimeout(runAnimation, 1000); // Delay before restarting
				}
			});
		}, [animation]);
		const bgStyle = {
			backgroundColor: animation.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: ['rgba(255,99,71, 1)', 'rgba(255,99,71, 0)', 'rgba(255,99,71, 1)'],
			}),
		};

		const boxStyle = {
			backgroundColor: animation.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: ['rgb(127, 130, 135)', 'rgb(200,200,200)', 'rgb(127, 130, 135)'],
			}),
		};
		const stylesr = StyleSheet.create({
			container: {
				position: 'absolute',
				height: '100%',
				width: '100%',
				borderRadius: 10,
			},
			box: {
				borderRadius: 10,
				height: '100%',
				width: '100%',
			},
		});
		return (
			<TouchableWithoutFeedback onPress={() => props.openFunction(props.info)}>
				<View
					style={{
						width: '96%',
						height: Dimensions.get('screen').height / 7,
						marginBottom: 5,
						padding: 4,
						marginLeft: '2%',
						borderRadius: 10,
						marginTop: '1%',
						borderColor: '#76B693',
						borderWidth: 2,
						// justifyContent: 'center',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '58%',
							height: '100%',
							borderRadius: 30,
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						<Image
							style={{
								height: '100%',
								width: '100%',
								borderRadius: 10,
							}}
							source={{uri: NGROK_URL + COMMUNITY_IMG_PATH + props.info.image}}
							contentFit='cover'
							resizeMode='contain'
							onLoadEnd={() => setLoad(false)}
						/>
						{load && (
							<Animated.View style={[stylesr.container, bgStyle]}>
								<Animated.View style={[stylesr.box, boxStyle]} />
							</Animated.View>
						)}
					</View>
					<View
						style={{
							width: '40%',
							height: '95%',
							marginLeft: '2%',
						}}
					>
						<View style={{flexDirection: 'row'}}>
							<View>{Device.brand == 'Apple' ? <Text style={{fontFamily: 'Poppins-semibold', fontSize: 12, color: '#8C8C8C'}}>{props.info.name}</Text> : <Text style={{fontFamily: 'Poppins-semibold', fontSize: 13, color: '#8C8C8C'}}>{props.info.name}</Text>}</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={{marginRight: '2%'}}>
								<Icons.Ionicons name='earth' size={18} color='#8C8C8C' />
							</View>
							<View>{Device.brand == 'Apple' ? <Text style={{fontFamily: 'Poppins-semibold', fontSize: 12, color: '#8C8C8C'}}>{props.info.visibility == 0 ? 'Public' : 'Private'}</Text> : <Text style={{fontFamily: 'Poppins-semibold', fontSize: 13, color: '#8C8C8C'}}>{props.info.visibility == 0 ? 'Public' : 'Private'}</Text>}</View>
						</View>
						{/* <View style={{flexDirection: 'row'}}>
							<View style={{marginRight: '2%'}}>
								<Icons.Ionicons name='people-sharp' size={18} color='#8C8C8C' />
							</View>
							<View>{Device.brand == 'Apple' ? <Text style={{fontFamily: 'Poppins-semibold', fontSize: 12, color: '#8C8C8C'}}>{props.info.members}K members</Text> : <Text style={{fontFamily: 'Poppins-semibold', fontSize: 13, color: '#8C8C8C'}}>{props.info.members}K members</Text>}</View>
						</View> */}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	} else if (props.type == 'category') {
		const [load, setLoad] = useState(true);
		const i18n = new I18n(categoryBottomSheetLocale);
		i18n.enableFallback = true;
		i18n.locale = locale;
		return (
			<TouchableWithoutFeedback
				onPress={() => props.openFun(props.data.name)}
				style={{
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						width: Dimensions.get('screen').width / 2,
						alignItems: 'center',
					}}
				>
					<View
						style={{
							width: '92%',
							height: Dimensions.get('screen').height / 4,
							borderRadius: 15,
							borderColor: '#76B693',
							borderWidth: 2,
							// justifyContent: 'center',
							flexDirection: 'row',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<View
							style={{
								width: '100%',
								height: '80%',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
						>
							<Image
								style={{
									height: 100,
									width: '98%',
								}}
								source={{uri: NGROK_URL + CATEGORY_IMG_PATH + props.data.image}}
								contentFit='cover'
								resizeMode='contain'
								onLoadEnd={() => setLoad(false)}
							/>
							{load && (
								<ActivityIndicator
									style={{
										height: 100,
										width: '98%',
									}}
									color='#76B693'
								/>
							)}
						</View>
						<View
							style={{
								width: '100%',
								height: '20%',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{fontFamily: 'Poppins-regular'}}>{i18n.t(`${props.data.name.toLowerCase()}`)}</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	} else if (props.type == 'profile') {
		return (
			<View
				style={{
					height: '13%',
					bottom: '0.2%',
					alignItems: 'center',
					flexDirection: 'row',
					left: '2%',
				}}
			>
				<View
					style={{
						height: Dimensions.get('screen').height / 11,
						width: Dimensions.get('screen').height / 11,
						backgroundColor: '#efefef',
						left: '1%',
						borderRadius: 30,
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onPress={() => props.openModal()}
				>
					<MaterialIcons name='add-a-photo' size={32} color='#76B693' />
				</View>
				<View
					style={{
						width: '50%',
						height: '100%',
						left: '20%',
						justifyContent: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: 'Poppins-medium',
							fontSize: 20,
						}}
					>
						{props.name}
					</Text>
					<Text
						style={{
							color: 'dodgerblue',
							textDecorationLine: 'underline',
							fontFamily: 'Poppins-regular',
							fontSize: 14,
						}}
						onPress={() => props.openModal()}
					>
						{props.text}
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	StoreCardContainer: {
		height: Dimensions.get('screen').height / 3.5,
		width: Dimensions.get('screen').width / 1.1,
		marginLeft: 0,
		marginBottom: 4,
	},
	StoreCardContainerRow1: {
		width: '100%',
		height: '75%',
		// borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
	StoreCardContainerRow2: {
		width: '100%',
		flexDirection: 'row',
	},
	StoreCardContainerRow2Col: {
		width: '50%',
		height: '100%',
	},
	StoreCardStoreName: {
		fontFamily: 'Poppins-semibold',
	},
	StoreCardStoreAddress: {
		fontFamily: 'Poppins-regular',
	},
	ratingCircle: {
		backgroundColor: '#76B693',
		height: 30,
		width: 30,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		right: 10,
	},
	Row2: {
		width: '100%',
		height: '85%',
		justifyContent: 'center',
	},
	FoodCardContainer: {
		flex: 1,
		backgroundColor: 'white',
		height: Dimensions.get('screen').height / 6,
		width: '98%',
		marginLeft: '1%',
		marginBottom: 4,
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderRadius: 5,
	},
	FoodCardContainerCol1: {
		width: '30%',
		height: '100%',
		justifyContent: 'center',
	},
	FoodCardContainerCol2: {
		width: '47%',
		backgroundColor: 'white',
		height: '100%',
		borderRadius: 5,
	},
	FoodCardContainerCol3: {
		width: '18%',
		height: '100%',
	},
});
