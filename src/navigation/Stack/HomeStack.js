import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, Notification, ScanQRCode } from "../../screens";

const StackHome = createStackNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator
      initiaRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackHome.Screen name="HomeScreen" component={HomeScreen} />
      <StackHome.Screen name="Notification" component={Notification} />
      <StackHome.Screen name="ScanQRCode" component={ScanQRCode} />
    </StackHome.Navigator>
  );
}
export default HomeStack;
