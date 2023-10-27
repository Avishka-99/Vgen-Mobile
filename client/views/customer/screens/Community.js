import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useRef, useMemo,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Card from '../../../components/Card';
import {FlashList} from '@shopify/flash-list';
import * as Icons from '../../../constants/Icons';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import Backdrop from '../../../components/Backdrop';
import {FAB} from 'react-native-elements';
//import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
export default function Community() {
	const bottomSheetModalRef = useRef(null);
	var user = useSelector((state) => state.userReducer.user);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 0,
			backgroundColor: '#E6E6E6',
			height: Dimensions.get('screen').height / 0.9,
		},
		container_2: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'white',
		},
		image: {
			resizeMode: 'cover',
			position: 'absolute',
			width: Dimensions.get('window').width,
			height: Dimensions.get('window').height,
			opacity: 0.2,
			marginTop: 80,

			// marginTop: Constants.deviceName == "iPhone" ? 0 : Constants.statusBarHeight,
		},
	});
	const communities = [
		{
			id: 1,
			type: 'Public community',
			name: 'Barista',
			location: 'Reid Aveue',
			members: 4.5,
		},
		{
			id: 2,
			type: 'Public community',
			name: 'Pizza hut',
			location: 'Havlock',
			members: 1.2,
		},
		{
			id: 3,
			type: 'Public community',
			name: 'Sri Vihar',
			location: 'Thunmulla',
			members: 1.6,
		},
		{
			id: 4,
			type: 'Public community',
			name: 'Nelum kole',
			location: 'Thimbirigasyaya',
			members: 3.3,
		},
		{
			id: 5,
			type: 'Public community',
			name: 'Savinra',
			location: 'Nugegoda',
			members: 2.5,
		},
		{
			id: 6,
			type: 'Public community',
			name: 'McDonalds',
			location: 'Reid Avenue',
			members: 7.5,
		},
		{
			id: 7,
			type: 'Public community',
			name: 'Mayumi Home Foods',
			location: 'Nawala',
			members: 1.7,
		},
		{
			id: 8,
			type: 'Public community',
			name: 'KFC',
			location: 'Nugegoda',
			members: 5.2,
		},
		{
			id: 9,
			type: 'Public community',
			name: 'Elite',
			location: 'Bambalapitiya',
			members: 1.4,
		},
		{
			id: 10,
			type: 'Public community',
			name: 'Elina Foods',
			location: 'Kirulapone',
			members: 2.8,
		},
		{
			id: 11,
			type: 'Public community',
			name: 'Saveira',
			location: 'Kohuwala',
			members: 2.9,
		},
		{
			id: 12,
			type: 'Public community',
			name: 'Go Green',
			location: 'Townhall',
			members: 1.7,
		},
	];
	const snapPoints = useMemo(() => ['98%'], []);

	const openModal = (data) => {
		//setstoreInfo(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		//console.log('sdsd')
		bottomSheetModalRef.current.close();
	};
	const MyCommunities = () => {
		useEffect(() => {
			async function fetchData() {
				const categories = await Axios.post(API_ENDPOINTS.FETCH_CATEGORIES);
				setCategories(categories.data);
			}
			fetchData();
			//setCategories()
			// Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
			// 	console.log(result.data)
			// 	setFoods(result.data);
			// 	dispatch(ALL_ACTIONS.setAllProducts(result.data));
			// 	//allFoods = useSelector((state) => state.userReducer.allProducts);
			// });
		}, []);
		return (
			<View style={{flex: 1, justifyContent: 'center'}}>
				<View style={{width: '100%', height: '10%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
					<View
						style={{
							width: '96%',
							height: '96%',
							backgroundColor: '#76B693',
							marginLeft: '2%',
							borderRadius: 20,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Icons.AntDesign name='addusergroup' size={44} color='white' />
						<Text style={{fontFamily: 'Poppins-semibold', fontSize: 18, color: '#fff'}}>New Community</Text>
					</View>
				</View>
				<FlashList data={communities} renderItem={({item}) => <Card type='community' openFunction={openModal} info={item} />} estimatedItemSize={communities.length} />
				<Portal>
					<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
						<CommunityModal />
					</BottomSheetModal>
					{/* <Modal swipeDirection={'down'} isVisible={isModalVisible}>
					<View style={{flex: 1}}>
						<Text>Hello!</Text>

						<Button title='Hide modal' onPress={toggleModal} />
					</View>
				</Modal> */}
				</Portal>
				<PortalHost name='community_main' />
				{/* <FAB title='Create' style={{position: 'absolute', left: '74%', top: '80%'}} /> */}
			</View>
		);
	};
	const ExploreCommunities = () => {
		return (
			<View>
				<Text>Explore communities</Text>
			</View>
		);
	};
	const CommunityModal = () => {
		return (
			<View style={{backgroundColor: 'white', flex: 1}}>
				<Text>Hellloo</Text>
			</View>
		);
	};
	const Tab = createMaterialTopTabNavigator();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {fontSize: 12},
				tabBarStyle: {borderBottomColor: 'yellow', shadowColor: 'red'},
			}}
		>
			<Tab.Screen name='Explore' component={ExploreCommunities} />
			<Tab.Screen name='My Communities' component={MyCommunities} />
		</Tab.Navigator>
	);
}
