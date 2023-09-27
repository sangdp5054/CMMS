import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import UiTab from "./UiTab";
import { Notification, Login } from "../screens";
import { icons } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../utilies/config";
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  const [isLoading, setisLoading] = useState(false);
  const handleSignOut = async () => {
    const cookie = await AsyncStorage.getItem("session_id");
    console.log("Cookie:", cookie);
    try {
      const response = await axios.post(
        `${BASE_URL}/web/session/destroy`,
        {
          jsonrpc: "2.0",
          params: {},
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookie, // Thêm cookie vào header
          },
        }
      );
      setisLoading(true);
      if (response.data) {
        // Xóa dữ liệu đăng nhập đã lưu trữ trong AsyncStorage
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("session_id");
        navigation.navigate("Login");
        setisLoading(false);
        console.log("Sign out successful. Response:", response.data);
      } else {
        setisLoading(false);
        console.log("Sign out failed. Response:", response.data);
      }
    } catch (error) {
      handleSignOut();
      setisLoading(false);
      console.log(error);
    }

    // // Xóa dữ liệu đăng nhập đã lưu trữ trong AsyncStorage
    // AsyncStorage.removeItem("userData");
    // AsyncStorage.removeItem("session_id")
    //   .then(() => {
    //     console.log("Sign out successful");
    //     // Chuyển hướng người dùng về màn hình đăng nhập
    //     navigation.navigate("Login");
    //   })
    //   .catch((error) => {
    //     console.error("Error signing out:", error);
    //   });
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          margintop: 10,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#333" />
        ) : (
          <TouchableOpacity
            onPress={handleSignOut}
            style={{ paddingVertical: 15 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={icons.logout} style={{ width: 22, height: 22 }} />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Roboto-Medium",
                  marginLeft: 5,
                  color: "#333",
                }}
              >
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
function UIDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
        drawerInactiveTintColor: "#333",
      }}
      useLegacyImplementation={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={UiTab}
        options={{
          drawerIcon: ({ color }) => (
            <Image source={icons.home} style={{ width: 24, height: 24 }} />
          ),
        }}
        ya
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{
          drawerIcon: ({ color }) => (
            <Image
              source={icons.notification}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default UIDrawer;
