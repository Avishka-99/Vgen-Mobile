import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
export default function Bottomsheet() {
    const bottomSheetRef = useRef(null);

    const handleOpenBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const handleCloseBottomSheet = () => {
        bottomSheetRef.current?.close();
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOpenBottomSheet}>
                <Text style={styles.openButton}>Open Bottom Sheet</Text>
            </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={['25%', '50%', '90%']}
                backgroundComponent={() => <View style={styles.background} />}
            >
                <View style={styles.sheetContent}>
                    <Text style={styles.sheetText}>Bottom Sheet Content</Text>
                    <TouchableOpacity onPress={handleCloseBottomSheet}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    openButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        padding: 10,
    },
    sheetContent: {
        backgroundColor: '#fff',
        padding: 16,
    },
    sheetText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
        textAlign: 'right',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});