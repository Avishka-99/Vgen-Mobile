import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { NGROK_URL,RESTAURANT_IMG_PATH } from "../constants/Constants";
export default function Bottomsheet(props) {
  return (
    <View style={styles.container}>
      <View style={styles.StoreBottomSheetRow1}>
        <Image
          style={{
            height: "100%",
            width: "100%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          source={{ uri: NGROK_URL + RESTAURANT_IMG_PATH + props.info.image }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  StoreBottomSheetRow1:{
    height:"20%",
    width:"100%"
  }
});
