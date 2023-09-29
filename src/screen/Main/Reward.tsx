import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

export const Reward = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text style={styles.title}>Total of survey</Text>
          <Text style={styles.number}>13</Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: "gray" }}>
            Survey can be used for variety of purposes such as market research
            public opinion polling. social science research program eveluation.
          </Text>
        </View>
        <View style={styles.coupon}>
          <View style={styles.leftView} />
          <View style={styles.dashes} />
          <View style={styles.rightView} />

          <View
            style={{
              width: "70%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>API data</Text>
          </View>
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>$5000</Text>
          </View>
        </View>
        {/* <ImageBackground
          style={{ height: 100, width: 300 }}
          source={require("../../assets/images/Coupon.png")}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#D0D0D0",
  },
  number: {
    fontSize: 90,
    fontWeight: "600",
    color: "#283671",
  },
  coupon: {
    borderWidth: 2,
    borderColor: "#D0D0D0",
    height: 120,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "white",
    position: "relative",
    flexDirection: "row",
  },
  leftView: {
    height: 40,
    width: 40,
    borderRightWidth: 3,
    borderColor: "#D0D0D0",
    borderRadius: 50,
    left: -25,
    backgroundColor: "white",
    position: "absolute",
    zIndex: -99,
    top: 40,
  },
  rightView: {
    height: 40,
    width: 40,
    borderLeftWidth: 3,
    borderColor: "#D0D0D0",
    borderRadius: 50,
    right: -25,
    backgroundColor: "white",
    position: "absolute",
    zIndex: -99,
    top: 40,
  },
  dashes: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    height: 120,
    width: 1,
    position: "absolute",
    right: "30%",
    borderStyle: "dashed",
  },
});
