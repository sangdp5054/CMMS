import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, check } from "../constants";
import { BASE_URL } from "../utilies/config";

function Login({ navigation }) {
  // const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = async () => {
    // Gửi yêu cầu API đăng nhập và lấy phản hồi
    await axios
      .post(
        `${BASE_URL}/web/session/authenticate`,
        {
          jsonrpc: "2.0",
          params: {
            db: "odoo_tac",
            login: email,
            password: password,
          },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
        setisLoading(true)
      )
      .then((response) => {
        // Kiểm tra phản hồi từ Odoo để xác định xem lấy dữ liệu có thành công hay không
        if (response.data.result) {
          console.log("Login successful. Response:", response.data);
          // Lấy session-id từ header của phản hồi
          const cookieHeader = response.headers["set-cookie"][0];
          const sessionId = cookieHeader.split(";")[0]; // Tách session-id
          // Lưu session-id vào AsyncStorage
          AsyncStorage.setItem("session_id", sessionId);
          console.log("Cookie saved:", sessionId);
          AsyncStorage.setItem("userData", JSON.stringify(response.data));

          navigation.navigate("UIDrawer");
          setisLoading(false);
        } else {
          console.log("Login failed. Response:", response.data);
          Alert.alert("Error", "Invalid email or password");
          setisLoading(false);
        }
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        console.log("Error authenticating:", error);
        // Alert.alert("Error", "Đăng nhập lại");
        handleLogin();
        setisLoading(false);
      });
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
        {/* <TouchableOpacity onPress={handleLogin}>
          <Text>Refesh</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  // const handleForgotPassword = () => {
  //   // Xử lý logic quên mật khẩu ở đây
  //   Alert.alert("Thông báo", "Chức năng quên mật khẩu chưa được triển khai");
  // };

  // const handleKeepLogin = () => {
  //   // Xử lý logic ghi nhớ đăng nhập ở đây
  //   Alert.alert(
  //     "Thông báo",
  //     "Chức năng ghi nhớ đăng nhập chưa được triển khai"
  //   );
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#bdd7ee",
      }}
    >
      <Image source={icons.logo} style={styles.logo} />
      <Text style={styles.text}> Đăng nhập vào CMMS </Text>

      <TextInput
        style={styles.input}
        placeholder="User name"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {/* <TouchableOpacity onPress={handleKeepLogin}>
        <Text style={styles.keepLogin}>keep login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bdd7ee",
  },
  text: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 50,
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    borderColor: "#3e5f97",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderColor: "#3e5f97",
    borderWidth: 1,
    width: "30%",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
  forgotPassword: {
    color: "black",
    marginBottom: 20,
  },
  keepLogin: {
    color: "black",
    marginBottom: 20,
  },
});
export default Login;
