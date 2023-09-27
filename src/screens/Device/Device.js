import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { UIHeader, UISearchBox } from "../../components";
import DeviceItem from "./DeviceItem";
import { BASE_URL } from "../../utilies/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
function Device(props) {
  const { navigation } = props;
  const { navigate } = navigation;
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [cookie, setCookie] = useState("");

  const filteredDevices = () =>
    data.filter((eachDevice) =>
      eachDevice.name.toLowerCase().includes(searchText.toLowerCase())
    );
  const handleSearch = (text) => {
    setSearchText(text);
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    // FastImage.clearDiskCache();
    // FastImage.clearMemoryCache();
    setData([]);
    await getData();
    setRefreshing(false);
  };

  useEffect(() => {
    setisLoading(true);
    // Clear the existing data before fetching new data
    getData();
    console.log("currentPage: ", currentPage);
  }, [currentPage]);
  // //Fetch api
  // const getData = async () => {
  //   console.log("useEffect pageCurrent: ", pageCurrent);
  //   const apiURL =
  //     "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" +
  //     pageCurrent;
  //   fetch(apiURL)
  //     .then((res) => res.json())
  //     .then((resJson) => {
  //       setData(data.concat(resJson));
  //       setisLoading(false);
  //     });
  // };
  // //Hiển thị icon loading footer
  // renderFooter = () => {
  //   return isLoading ? (
  //     <View style={{ margintop: 10, alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   ) : null;
  // };
  // //Load More
  // handleLoadMore = () => {
  //   console.log("hanđle loadmore: ");
  //   setpageCurrent(pageCurrent + 1);
  //   setisLoading(true);
  // };

  const getData = async () => {
    try {
      const session_id = await AsyncStorage.getItem("session_id"); // Lấy session-id từ AsyncStorage
      const cookie = `frontend_lang=en_US; ${session_id}`; // Thêm frontend_lang vào cookie
      setCookie(cookie);
      //Gửi yêu cầu API đăng nhập và lấy phản hồi
      const response = await axios.post(
        `${BASE_URL}/api/device`, // Thay thế bằng URL API Odoo
        {
          body: JSON.stringify({
            jsonrpc: "2.0",
            params: {},
          }),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: cookie, // Thêm cookie vào header
          },
        }
      );

      // Kiểm tra phản hồi từ Odoo để xác định xem lấy dữ liệu có thành công hay không
      if (response.data.result.response) {
        console.log("Device List:", response.data.result.response);
        setData(response.data.result.response); // Lưu dữ liệu vào state để hiển thị\
        // setData([...data, ...response.data.result.response]);
        // setData(data.concat(response.data.result.response));
        setRefreshing(false); // Stop the refreshing indicator
        setisLoading(false);
      } else {
        console.log("Error fetching device list. Response:", response.data);
      }
    } catch (error) {
      // Xử lý lỗi, ví dụ hiển thị thông báo lỗi
      console.log("Error fetching device list:", error);
      getData();
      setRefreshing(false); // Stop the refreshing indicator
      setisLoading(false);
    }
  };
  // if (isLoading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         margintop: 10,
  //         alignItems: "center",
  //         backgroundColor: "white",
  //       }}
  //     >
  //       <ActivityIndicator size="large" />
  //       <TouchableOpacity onPress={getData}>
  //         <Text>Refesh</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  // const renderLoader = () => {
  //   return isLoading ? (
  //     <View
  //       style={{
  //         marginVertical: 16,
  //         alignItems: "center",
  //       }}
  //     >
  //       <ActivityIndicator size="large" color="#aaa" />
  //     </View>
  //   ) : null;
  // };

  // const loadMoreItem = () => {
  //   setCurrentPage(currentPage + 1);
  //   setisLoading(true);
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <UIHeader title="Device" isHome navigation={navigation} />
        <UISearchBox onChangeText={handleSearch} />
        {data.length === 0 ? (
          <View
            style={{
              margintop: 10,
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <ActivityIndicator size="large" />
            <TouchableOpacity onPress={getData}>
              <Text>Refesh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredDevices()}
            renderItem={({ item }) => (
              <DeviceItem
                onPress={() => {
                  // alert(`You press item's name: ${item.title}`);
                  navigate("DeviceDetail", { device: item });
                }}
                device={item}
                cookie={cookie}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            // keyExtractor={(item) => item.name}
            // ListFooterComponent={renderLoader}
            // onEndReached={loadMoreItem}
            // onEndReachedThreshold={0}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            windowSize={21}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
export default Device;
