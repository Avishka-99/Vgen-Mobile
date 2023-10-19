import {View, Text, StyleSheet,ActivityIndicator} from 'react-native';
import React, {useRef, useMemo, useState,useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/Card';
import Backdrop from '../../../components/Backdrop';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import * as API_ENDPOINTS from '../../../api/ApiEndpoints';
import {CategoryBottomSheet} from '../../../components/Bottomsheet';
import Axios from '../../../api/Axios';
export default function Categories() {
	const [sheetTitle, setSheetTitle] = useState(null);
	const [method, setMethod] = useState('pickup');
	const [veganFoodCategories,setV] =useState(null);
	const [categories,setCategories]=useState(null);
	const [option, setOption] = useState('take away');
	const options = ['all','delivery','dine in','take away']
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			height: '100%',
		},
	});
	useEffect(() => {
		Axios.post(API_ENDPOINTS.FETCH_CATEGORIES).then((result)=>{
			setCategories(result.data)
		})
	}, []);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['98%'], []);
	const openModal = (data) => {
		setSheetTitle(data);
		console.log(data);
		//setstoreInfo(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		bottomSheetModalRef.current.close();
	};
	const changeOption = ()=>{
		setOption(options[(options.indexOf(option)+1)%4]);
	}
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
					<CategoryBottomSheet optionChangeFun={changeOption} closeFun={CloseModal} type={option} title={sheetTitle} />
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
