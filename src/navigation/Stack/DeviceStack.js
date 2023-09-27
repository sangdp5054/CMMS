import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Device, DeviceDetail, Notification } from "../../screens";

const StackDevice = createStackNavigator();

function DeviceStack() {
  return (
    <StackDevice.Navigator
      initiaRouteName="Device"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackDevice.Screen name="Device" component={Device} />
      <StackDevice.Screen name="DeviceDetail" component={DeviceDetail} />
      <StackDevice.Screen name="Notification" component={Notification} />
    </StackDevice.Navigator>
  );
}
export default DeviceStack;
