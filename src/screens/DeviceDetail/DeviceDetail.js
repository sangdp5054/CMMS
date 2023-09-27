import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { colors } from "../../constants";
import { UIHeader } from "../../components";
import FastImage from "react-native-fast-image";
// import DeviceDetailItem from "./DeviceDetailItem";
import RNFetchBlob from "rn-fetch-blob";
import mime from "react-native-mime-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

function DeviceDetail(props) {
  const {
    name,
    model,
    cmms_link,
    default_code,
    image_1920,
    cmms_serial,
    cmms_status,
    categ_id,
    cmms_install_uid,
    cmms_install_date,
    barcode,
    cmms_project_id,
    description,
    cmms_warranty_start_supplier,
    cmms_warranty_end_supplier,
    cmms_warranty_supplier,
    cmms_warranty_supplier_status,
    cmms_warranty_remain_supplier,
    cmms_warranty_start_project,
    cmms_warranty_end_project,
    cmms_warranty_project,
    cmms_warranty_project_status,
    cmms_warranty_remain_project,
    cmms_purchase_date,
    cmms_purchase_note,
    cmms_vendor_id,
    cmms_manufacture_id,
    cmms_attachment_files,
    img_change,
  } = props.route.params.device;
  const { navigation } = props;
  const [isImageError, setIsImageError] = useState(false);
  const [cookie, setCookie] = useState("");

  function _getColorFromStatus(cmms_status) {
    return cmms_status.toLowerCase().trim() == "store"
      ? colors.store
      : cmms_status.toLowerCase().trim() == "unknown"
      ? colors.unknown
      : cmms_status.toLowerCase().trim() == "warranty"
      ? colors.warranty
      : cmms_status.toLowerCase().trim() == "repair"
      ? colors.repair
      : cmms_status.toLowerCase().trim() == "normal"
      ? colors.normal
      : cmms_status.toLowerCase().trim() == "error"
      ? colors.error
      : cmms_status.toLowerCase().trim() == "maintenace"
      ? colors.maintenace
      : cmms_status.toLowerCase().trim() == "remove"
      ? colors.remove
      : colors.none;
  }
  function _getColorFromSupplierStatus(cmms_warranty_supplier_status) {
    return cmms_warranty_supplier_status.toLowerCase().trim() == "ineffective"
      ? colors.ineffective
      : cmms_warranty_supplier_status.toLowerCase().trim() == "effective"
      ? colors.effective
      : colors.none;
  }
  function _getColorFromProjectStatus(cmms_warranty_project_status) {
    return cmms_warranty_project_status.toLowerCase().trim() == "effective"
      ? colors.effective
      : cmms_warranty_project_status.toLowerCase().trim() == "ineffective"
      ? colors.ineffective
      : colors.none;
  }

  const returnFilePath = async (fileName) => {
    const dirPath =
      Platform.OS === "ios"
        ? `${RNFS.DocumentDirectoryPath}`
        : `${RNFS.DownloadDirectoryPath}`;
    const filePath = `${dirPath}/${fileName}`;
    return filePath;
  };
  const previewDownloadedFile = async (fileName) => {
    try {
      const filePath = await returnFilePath(fileName);
      FileViewer.open(filePath)
        .then(() => {
          console.log("File preview success");
        })
        .catch((error) => {
          console.log("Error previewing file:", error);
          Alert.alert("Error", "Could not open the file for preview.");
        });
    } catch (error) {
      console.log("Error getting file path:", error);
      Alert.alert("Error", "Could not find the downloaded file.");
    }
  };

  const downloadFile = async (fileUrl, fileName) => {
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;
    const filePath = `${fileDir}/${fileName}`;
    const mimeType = mime.lookup(filePath);
    const session_id = await AsyncStorage.getItem("session_id"); // Lấy session-id từ AsyncStorage
    const cookie = `frontend_lang=en_US; ${session_id}`; // Thêm frontend_lang vào cookie
    setCookie(cookie);
    // Xây dựng headers bao gồm Cookie
    const headers = {
      Cookie: cookie,
    };
    config({
      // fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: mimeType || "application/octet-stream",
        title: fileName,
        path: filePath,
        // Set the cookie header
        headers: headers, // Gửi session-id và frontend_lang trong header Cookie
      },
    })
      .fetch("GET", fileUrl, headers)
      .then((res) => {
        console.log("res", res);
        console.log("Cookie:", cookie);
        Alert.alert("Download Complete", `File saved to ${filePath}`);
      })
      .catch((error) => {
        console.log("Error downloading file:", error);
        Alert.alert("Error", "Could not download the file.");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <UIHeader title="Device detail" navigation={navigation} />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flexDirection: "column" }}>
          <View
            style={{ alignItems: "center", paddingTop: 10, paddingBottom: 20 }}
          >
            {/* <Image
              style={{
                width: 380,
                height: 200,
                borderRadius: 10,
                resizeMode: "contain",
              }}
              source={{
                // uri: isImageError
                //   ? "http://10.10.8.65:7038/web/image?model=product.template&field=image_1920&id=44&unique=1691976529000" // Đường dẫn đến hình ảnh lỗi thay thế
                //   : image_1920 + `?image_change=${img_change}`,
                uri: image_1920 + `/?image_change=${img_change}`,
                headers: { Cookie: cookie },
              }}
              onError={() => setIsImageError(true)}
            /> */}
            <FastImage
              style={{
                width: 380,
                height: 200,
                borderRadius: 10,
              }}
              source={{
                uri: image_1920 + `/?image_change=${img_change}`,
                cache: FastImage.cacheControl.immutable,
                priority: FastImage.priority.high,
                headers: { Cookie: cookie },
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{ paddingStart: 20, paddingEnd: 20, paddingBottom: 20 }}>
            {/* GENERAL */}
            <Text style={styles.title}>GENERAL</Text>
            <View style={styles.divider} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Name</Text>
              <Text style={styles.body}>{name}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Model</Text>
              <Text style={styles.body}>{model}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Category</Text>
              <Text style={styles.body}>{default_code}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>SN</Text>
              <Text style={styles.body}>{cmms_serial}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Device State</Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: _getColorFromStatus(cmms_status),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {cmms_status}
                </Text>
              </View>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Supplier Warranty status</Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: _getColorFromSupplierStatus(
                    cmms_warranty_supplier_status
                  ),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {cmms_warranty_supplier_status}
                </Text>
              </View>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Project Warranty status</Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: _getColorFromProjectStatus(
                    cmms_warranty_project_status
                  ),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {cmms_warranty_project_status}
                </Text>
              </View>
            </View>
            {/* PROJECT */}
            <Text style={styles.title}>PROJECT</Text>
            <View style={styles.divider} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Project</Text>
              <Text style={styles.body}>{cmms_project_id}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Date</Text>
              <Text style={styles.body}>{cmms_install_date}</Text>
            </View>
            <View style={styles.dividermini} />

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Installer</Text>
              <Text style={styles.body}>{cmms_install_uid}</Text>
            </View>
            {/* WARRANTY */}
            <Text style={styles.title}>WARRANTY</Text>
            <View style={styles.divider} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Supplier warranty</Text>
              <Text style={styles.body}>{cmms_warranty_supplier} month</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Supplier warranty Start</Text>
              <Text style={styles.body}>{cmms_warranty_start_supplier}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Supplier warranty End</Text>
              <Text style={styles.body}>{cmms_warranty_end_supplier}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Project warranty</Text>
              <Text style={styles.body}>{cmms_warranty_project} month</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Project warranty Start</Text>
              <Text style={styles.body}>{cmms_warranty_start_project}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Project warranty End</Text>
              <Text style={styles.body}>{cmms_warranty_end_project}</Text>
            </View>
            {/* PURCHASE */}
            <Text style={styles.title}>PURCHASE</Text>
            <View style={styles.divider} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Purchase Date</Text>
              <Text style={styles.body}>{cmms_purchase_date}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Supplier</Text>
              <Text style={styles.body}>{cmms_vendor_id}</Text>
            </View>
            <View style={styles.dividermini} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.content}>Distributor</Text>
              <Text style={styles.body}>{cmms_manufacture_id}</Text>
            </View>
            {/* DOCUMENTS */}
            <Text style={styles.title}>DOCUMENTS</Text>
            <View style={styles.divider} />
            <View style={{ flexDirection: "column" }}>
              {/* Hiển thị nút tải xuống cho mỗi tập tin đính kèm */}
              {cmms_attachment_files.map((file, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "black",
                      paddingVertical: 10,
                      flex: 1.5,
                      marginLeft: 10,
                    }}
                  >
                    {file.cmms_name}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      marginLeft: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => downloadFile(file.cmms_file, file.cmms_name)}
                  >
                    <Text style={{ color: "blue", textAlign: "left" }}>
                      Download
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      marginLeft: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => previewDownloadedFile(file.cmms_name)}
                  >
                    <Text style={{ color: "blue", textAlign: "left" }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  divider: {
    height: 2,
    backgroundColor: "rgb(4, 122, 165)",
    marginBottom: 5,
  },
  dividermini: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 5,
    marginTop: 5,
  },
  title: {
    color: "rgb(4, 122, 165)",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingStart: 10,
    fontSize: 25,
    marginTop: 40,
  },
  content: {
    color: "black",
    paddingVertical: 10,
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
  },
  body: {
    color: "black",
    paddingVertical: 10,
    flex: 0.5,
    paddingStart: 10,
    alignSelf: "center",
  },
});
export default DeviceDetail;
