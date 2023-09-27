import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScanQRCode, DeviceDetail } from "../../screens";

const StackScan = createStackNavigator();

function ScanStack() {
  return (
    <StackScan.Navigator
      initiaRouteName="ScanQRCode"
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackScan.Screen name="ScanQRCode" component={ScanQRCode} />
      <StackScan.Screen name="DeviceDetail" component={DeviceDetail} />
    </StackScan.Navigator>
  );
}
export default ScanStack;
