import {View, Text, StyleSheet, Button, Switch, Dimensions} from 'react-native';
import React, {useRef, useMemo, useState} from 'react';
import { BottomSheet, BottomSheetScrollView } from '@gorhom/bottom-sheet';

export default function BottomSheetOrder(){
    const bottomSheetRef = React.createRef();
    return(
        <BottomSheet
        visible={this.state.visible}
        onBackdropPress={() => this.setState({ visible: false })}
        height={400}
      >
        <View style={styles.content}>
          <Text>This is the content of the bottom sheet!</Text>
        </View>
      </BottomSheet>
)

}