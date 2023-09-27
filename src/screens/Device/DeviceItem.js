import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../../constants";
import FastImage from "react-native-fast-image";
function DeviceItem(props) {
  let {
    name,
    cmms_status,
    cmms_warranty_supplier_status,
    cmms_warranty_project_status,
    image_1920,
    cmms_project_id,
    cmms_serial,
    img_change,
  } = props.device; // destructuring an object
  const { onPress, cookie } = props;
  const [isImageError, setIsImageError] = useState(false);
  function _getColorFromStatus(cmms_status) {
    /*
                    if(status.toLowerCase().trim() == 'opening now') {
                        return colors.success
                    } else if(status.toLowerCase().trim() == 'closing soon') {
                        return colors.alert
                    } else if(status.toLowerCase().trim() == 'comming soon') {
                        return colors.warning
                    }
                    return colors.success
                    */
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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 170,
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 0.4 }}>
        {/* <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "center",
            borderRadius: 10,
            marginRight: 15,
          }}
          source={{
            uri: isImageError
              ? "http://10.10.8.65:7038/web/image?model=product.template&field=image_1920&id=44&unique=1691976529000" // Đường dẫn đến hình ảnh lỗi thay thế
              : image_1920 + `?image_change=${img_change}`,
            method: "GET",
            headers: { Cookie: cookie },
            // image_1920 + `?image_change=${img_change}`,
          }}
          onLoad={() => console.log("uri", image_1920 + `?image=${img_change}`)}
          onError={() => setIsImageError(true)}
        /> */}

        <FastImage
          style={{ width: 100, height: 100, borderRadius: 10 }}
          source={{
            uri: image_1920 + `/?image_change=${img_change}`,
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.high,
            headers: { Cookie: cookie },
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginRight: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: _getColorFromStatus(cmms_status),
              alignSelf: "flex-end",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {cmms_status}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.infoText}>Project: {cmms_project_id}</Text>
        <Text style={styles.infoText}> ● S/N: {cmms_serial}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.infoText}> ● Supplier status: </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: _getColorFromSupplierStatus(
                cmms_warranty_supplier_status
              ),
              alignSelf: "flex-end",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {cmms_warranty_supplier_status}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.infoText}> ● Project status: </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: _getColorFromProjectStatus(
                cmms_warranty_project_status
              ),
              alignSelf: "flex-end",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              {cmms_warranty_project_status}
            </Text>
          </View>
        </View>
        <View style={styles.divider2} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    color: "black",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 5,
    marginTop: 5,
  },
  divider2: {
    display: "flex",
    height: 1,
    backgroundColor: "black",
    marginBottom: 5,
    marginTop: 10,
  },
  infoText: {
    // color: "'rgba(0,0,0,0.5)'",
    color: "black",
  },
});

export default DeviceItem;
