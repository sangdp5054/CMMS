import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { icons } from "../constants";
import HomeStack from "./Stack/HomeStack";
import DeviceStack from "./Stack/DeviceStack";
import ScanStack from "./Stack/ScanStack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "HomeStack") {
      iconName = focused ? icons.dashboard : icons.dashboard;
    } else if (route.name === "Scan") {
      iconName = focused ? icons.scan : icons.scan;
    } else if (route.name === "DeviceStack") {
      iconName = focused ? icons.device : icons.device;
    }
    // You can return any component that you like here!
    return <Image source={iconName} style={{ width: 30, height: 30 }} />;
  },
  tabBarActiveTintColor: "tomato",
  tabBarInactiveTintColor: "gray",
  tabBarActiveBackgroundColor: "#bdd7ee",
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
});
function UiTab() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Dashboard",
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanStack}
        options={{
          tabBarLabel: "Scan",
        }}
      />
      <Tab.Screen
        name="DeviceStack"
        component={DeviceStack}
        options={{
          tabBarLabel: "Device",
        }}
      />
    </Tab.Navigator>
  );
}
export default UiTab;
