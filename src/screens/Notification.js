import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { UIHeader, UISearchBox } from "../components";

function Notification({ navigation }) {
  const [data, setData] = useState("");
  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetch(baseURL)
      .then((e) => e.json())
      .then((rep) => setData(rep))
      .catch((err) => {
        setData([]);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <UIHeader title="Notification" isCheck navigation={navigation} />
      <View
        style={{
          flex: 1,
          paddingStart: 20,
          paddingEnd: 10,
          paddingTop: 20,
          height: 100,
        }}
      >
        {data.length === 0 ? (
          <Text style={{ alignSelf: "center", marginTop: 20 }}>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ flex: 1 }}>
                <Text style={styles.tittle}>Date</Text>
                <View style={styles.divider} />
                <Text style={styles.tittle}></Text>
                <Text style={styles.content}></Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "black",
    marginBottom: 5,
  },
  tittle: {
    color: "black",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  content: {
    color: "black",
    paddingBottom: 20,
  },
});
export default Notification;
