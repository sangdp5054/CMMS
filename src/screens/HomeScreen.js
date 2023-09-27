import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { UIHeader } from "../components";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <UIHeader title='Home' />
                    <UISearchBox></UISearchBox> */}
      <UIHeader title="Home" isHome navigation={navigation} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Text>This is the about Home</Text>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
