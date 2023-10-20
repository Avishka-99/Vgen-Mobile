import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useRef, useMemo, useState, useEffect, useReducer} from 'react';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/Card';
import Backdrop from '../../../components/Backdrop';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints';
import {CategoryBottomSheet} from '../../../components/Bottomsheet';
import Axios from '../../../api/Axios';
import * as Haptics from 'expo-haptics';
import * as ALL_ACTIONS from '../../../actions/AllActions';
import {useSelector, useDispatch} from 'react-redux';
export default function Categories() {
	const dispatch = useDispatch();
	const [sheetTitle, setSheetTitle] = useState(null);
	const [method, setMethod] = useState('pickup');
	const [foods, setFoods] = useState([]);
	const [categories, setCategories] = useState(null);
	const [option, setOption] = useState('take away');
	const options = ['delivery', 'dine in', 'take away', 'all'];
	const initialRender = useRef(true);
	const allFoods = useSelector((state) => state.userReducer.allProducts);
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			height: '100%',
			backgroundColor: 'white',
		},
	});
	useEffect(() => {
		Axios.post(API_ENDPOINTS.FETCH_CATEGORIES).then((result) => {
			setCategories(result.data);
		});
		Axios.post(API_ENDPOINTS.FETCH_ALL_PRODUCTS).then((result) => {
			setFoods(result.data);
			dispatch(ALL_ACTIONS.setAllProducts(result.data));
		});
	}, []);
	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false; // Set to false after the initial render
			return;
		}
		if (option == 'all') {
			setFoods(allFoods);
		} else {
			var newFoods = foods.filter(filterArrayByOptions);
			setFoods(newFoods);
		}
	}, [option]);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['98%'], []);
	const openModal = (data) => {
		var newFoods = allFoods.filter((item) => filterArrayByCategory(item, data));
		setFoods(newFoods);
		setSheetTitle(data);
		console.log(data);
		//setstoreInfo(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		bottomSheetModalRef.current.close();
	};
	const filterArrayByOptions = (item) => {
		if (JSON.parse(item.sell_products[0].options)[options.indexOf(option)] == '1') {
			return item;
		}
	};
	const filterArrayByCategory = (item, option) => {
		if (item.vegan_category == option) {
			return item;
		}
	};
	const changeOption = () => {
		setOption(options[(options.indexOf(option) + 1) % 4]);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	};
	return (
		<View style={styles.container}>
			{categories ? (
				<FlashList contentContainerStyle={{paddingBottom: 100}} ItemSeparatorComponent={() => <View style={{height: 20}} />} numColumns={2} data={categories} renderItem={({item}) => <Card type='category' openFun={openModal} data={item} />} estimatedItemSize={categories.length} />
			) : (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator size='large' color='#76B693' />
				</View>
			)}

			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
					{foods ? <CategoryBottomSheet optionChangeFun={changeOption} closeFun={CloseModal} type={option} title={sheetTitle} data={foods} /> : <></>}
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
	//columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}} contentContainerStyle={{paddingBottom: 100}}
}
