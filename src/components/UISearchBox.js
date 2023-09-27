import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../constants";

function UISearchBox(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  const { onChangeText } = props;
  const [searchText, setSearchText] = useState("");
  const handleTextChange = (text) => {
    setSearchText(text);
    onChangeText(text); // Gửi giá trị tìm kiếm lên component cha
  };
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.contentContainer}
          placeholderTextColor="#BDBDBD"
          placeholder="Search"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchText}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
  },
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "#E8E8E8",
    marginHorizontal: 15,
    borderRadius: 30,
    paddingLeft: 10,
  },
});

export default UISearchBox;
