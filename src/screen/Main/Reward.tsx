import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { TStateData } from "../../typings/SliceData";
import { COLORS } from "../../styles";

export const Reward = () => {
  const { userData } = useSelector((state: TStateData) => state.user);
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
          <Text style={styles.number}>
            {userData?._embedded?.aggregations?.count_reviews}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ color: "gray" }}>
            Survey can be used for variety of purposes such as market research
            public opinion polling. social science research program eveluation.
          </Text>
        </View>
        <View style={styles.coupon}>
          <View style={styles.leftView} />
          <View style={styles.rightView} />
          <View style={styles.dataView}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/FreeReward.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text
              style={{ fontWeight: "500", color: "gray", textAlign: "center" }}
            >
              $5 pocket money for a child in need
            </Text>
          </View>
          <View style={styles.dashes} />
          <View style={styles.priceView}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
              $5000
            </Text>
          </View>
        </View>
        <View style={styles.coupon}>
          <View style={styles.leftView} />
          <View style={styles.rightView} />
          <View style={styles.dataView}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/donut.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ fontWeight: "500", color: "gray" }}>
              $5 feed a hungry dog or cat
            </Text>
          </View>
          <View style={styles.dashes} />
          <View style={styles.priceView}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
              $10000
            </Text>
          </View>
        </View>
        <View style={styles.coupon}>
          <View style={styles.leftView} />
          <View style={styles.rightView} />
          <View style={styles.dataView}>
            <Image
              resizeMode="contain"
              source={require("../../assets/images/reward.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ fontWeight: "500", color: "gray" }}>
              $10 intractive tour for animal
            </Text>
          </View>
          <View style={styles.dashes} />
          <View style={styles.priceView}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
              $10000
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.darkGrey,
  },
  number: {
    fontSize: 90,
    fontWeight: "600",
    color: COLORS.labelText,
  },
  coupon: {
    borderWidth: 2,
    borderColor: COLORS.darkGrey,
    height: 120,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "white",
    // position: "relative",
    flexDirection: "row",
    flex: 1,
  },
  leftView: {
    height: 40,
    width: 40,
    borderRightWidth: 3,
    borderColor: COLORS.darkGrey,
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
    borderColor: COLORS.darkGrey,
    borderRadius: 50,
    right: -25,
    backgroundColor: "white",
    position: "absolute",
    zIndex: -99,
    top: 40,
  },
  dashes: {
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    height: 120,
    width: 1,
    borderStyle: "dashed",
  },
  dataView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2.5,
    padding: 20,
    left: 10,
  },
  priceView: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
