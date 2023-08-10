import {StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback} from 'react-native';
// import { Image } from 'expo-image';
import React, {useEffect} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {RESTAURANT_IMG_PATH, PRODUCT_IMG_PATH} from '../constants/Constants';
import {BASE_URL} from '../constants/Constants';
import {NGROK_URL} from '../constants/Constants';
import {Chip} from 'react-native-paper';
import Axios from '../api/Axios';
export default function Card(props) {
	if (props.type == 'store') {
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
						/>
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
					<View style={[{flexDirection: 'row', alignItems: 'center'}, styles.StoreCardContainerRow2Col]}>
						<View style={styles.ratingCircle}>
							<Text style={{color: 'black'}}>{props.rating}</Text>
						</View>
						<TouchableWithoutFeedback onPress={() => props.favStore(props.details.id)}>
							<AntDesign name={props.isFav ? 'heart' : 'hearto'} size={24} color='#F55064' />
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		);
	} else if (props.type == 'food') {
		console.log(props.data.sell_products[0].price)
		return (
			<TouchableWithoutFeedback onPress={()=>props.openModal(props.data)}>
				<View style={styles.FoodCardContainer}>
					<View style={styles.FoodCardContainerCol1}>
						<Image
							style={{
								height: '94%',
								width: '98%',
								borderRadius: 15,
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
		borderRadius: 14,
		justifyContent: 'center',
	},
	StoreCardContainerRow2: {
		flexDirection: 'row',
	},
	StoreCardContainerRow2Col: {
		width: '84%',
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
