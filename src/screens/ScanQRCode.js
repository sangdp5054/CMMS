import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
function ScanQRCode(props) {
  const { navigation } = props;
  const [apiData, setApiData] = useState(null); // State để lưu trữ dữ liệu từ API
  const [cookie, setCookie] = useState("");

  // const onScan = (e) => {
  //   if (e.data) {
  //     const apiUrl = e.data;
  //     fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         setApiData(json); // Lưu dữ liệu từ API vào state
  //         navigation.navigate("DeviceDetail", { device: json }); // Chuyển đến màn hình DeviceDetail và truyền dữ liệu từ API
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  //   console.log(e.data);
  // };
  const onScan = async (e) => {
    if (e.data) {
      const apiUrl = e.data;

      // Thêm '/mobile' vào apiUrl
      const fullApiUrl = apiUrl + "/mobile";

      // Tạo dữ liệu body
      const requestBody = {
        jsonrpc: "2.0",
        params: {},
      };
      const session_id = await AsyncStorage.getItem("session_id"); // Lấy session-id từ AsyncStorage
      const cookie = `frontend_lang=en_US; ${session_id}`; // Thêm frontend_lang vào cookie
      const headers = {
        Cookie: cookie,
      };
      // Gọi API với axios.post
      axios
        .post(fullApiUrl, requestBody, headers)
        .then((response) => {
          console.log("Device Detail:", response.data.result.device_info);
          // setApiData(response.data.result.device_info); // Lưu dữ liệu từ API vào state
          navigation.navigate("DeviceDetail", {
            device: response.data.result.device_info,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onScan}
        showMarker={true}
        reactivate={true}
        // reactivateTimeout={1000}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default ScanQRCode;
