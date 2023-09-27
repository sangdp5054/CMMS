import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { icons } from "../constants";

function Loading({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bdd7ee",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          source={icons.logo}
          style={{ width: 150, height: 100, marginBottom: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}
export default Loading;
