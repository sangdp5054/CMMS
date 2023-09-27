import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../../screens";
import { UIDrawer } from "../../navigation";
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="UIDrawer" component={UIDrawer} />
    </Stack.Navigator>
  );
};

export default AuthStack;
