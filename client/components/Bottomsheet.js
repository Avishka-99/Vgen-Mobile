import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
export default function Bottomsheet() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    textAlign: "center",
    padding: 10,
  },
  sheetContent: {
    backgroundColor: "#fff",
    padding: 16,
  },
  sheetText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    fontSize: 18,
    color: "red",
    textAlign: "right",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
