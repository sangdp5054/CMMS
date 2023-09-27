import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UIDrawer } from "./src/navigation";
import { Login } from "./src/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStack from "./src/navigation/Stack/AuthStack";
function App() {
  const Stack = createNativeStackNavigator();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);
  const checkLogin = async () => {
    const cookie = await AsyncStorage.getItem("session_id");
    if (cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UIDrawer" component={UIDrawer} />
      </Stack.Navigator> */}
      {isLogin ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="UIDrawer" component={UIDrawer} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
export default App;
