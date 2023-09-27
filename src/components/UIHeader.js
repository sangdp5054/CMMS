import React from "react";
import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import { icons } from "../constants";

const createTwoButtonAlert = () =>
  Alert.alert("Thông báo", "Bạn muốn đánh dấu đã đọc tất cả thông báo mới", [
    {
      text: "Đồng ý",
    },
    { text: "Bỏ qua" },
  ]);
function UIHeader({ title, isHome, isCheck, navigation }) {
  return (
    <View style={{ flexDirection: "row", height: 50 }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{ width: 30, height: 30, marginLeft: 5 }}
              source={icons.menu}
              rezizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center," }}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{ width: 20, height: 20, marginLeft: 5 }}
              source={icons.back}
              rezizeMode="contain"
            />
            <Text style={{ color: "black" }}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 1.5, justifyContent: "center" }}>
        <Text
          style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
        >
          {title}
        </Text>
      </View>
      {isCheck ? (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
          onPress={createTwoButtonAlert}
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 5 }}
            source={icons.check}
            rezizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
          onPress={() => navigation.navigate("Notification")}
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 5 }}
            source={icons.notification}
            rezizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
export default UIHeader;
