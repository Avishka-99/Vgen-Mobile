import {View, Text, StyleSheet} from 'react-native';
import React, {useRef, useMemo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/Card';
import Backdrop from '../../../components/Backdrop';
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';
import Bottomsheet from '../../../components/Bottomsheet';
import { CategoryBottomSheet } from '../../../components/Bottomsheet';
export default function Categories() {
	const[sheetTitle,setSheetTitle]=useState(null)
	const veganFoodCategories = [
		{id: '1', name: 'Fruits', image: 'fruit.png'},
		{id: '2', name: 'Vegetables', image: 'vegetable.png'},
		{id: '3', name: 'Legumes', image: 'legume.png'},
		{id: '4', name: 'Grains', image: 'grains.png'},
		{id: '5', name: 'Nuts & Seeds', image: 'nuts.png'},
		{id: '8', name: 'Oils', image: 'oil.png'},
		{id: '10', name: 'Desserts', image: 'dessert.png'},
		{id: '12', name: 'Snacks', image: 'snacks.png'},
		{id: '13', name: 'Beverages', image: 'beverages.png'},
	];
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			height: '100%',
		},
	});
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ['98%'], []);
	const openModal = (data) => {
		setSheetTitle(data)
		console.log(data);
		//setstoreInfo(data);
		bottomSheetModalRef.current.present();
	};
	const CloseModal = () => {
		bottomSheetModalRef.current.close();
	};
	return (
		<View style={styles.container}>
			<FlashList contentContainerStyle={{paddingBottom: 100}} ItemSeparatorComponent={() => <View style={{height: 20}} />} numColumns={2} data={veganFoodCategories} renderItem={({item}) => <Card type='category' openFun={openModal} data={item} />} estimatedItemSize={veganFoodCategories.length} />
			<Portal>
				<BottomSheetModal backgroundComponent={null} backdropComponent={Backdrop} ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
					<CategoryBottomSheet closeFun={CloseModal} type='category_product' title={sheetTitle} />
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
