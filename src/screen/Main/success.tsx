import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { deviceWidth } from "../../utils/Dimension";
import { COLORS } from "../../styles";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

export const Success = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#CDE9E1" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/Star_Congratulation.png")}
          style={{
            height: width * 0.6,
            width: width * 0.6,
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Congratulations!</Text>
        <Text style={styles.descriptionText}>
          Did you know that you can view your record of point transactions.
          Learn more here.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                },
              ],
            })
          }
        >
          <Text style={styles.buttonText}>Back to homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#CDE9E1",
    flex: 1,
    paddingVertical: height * 0.125,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 35,
    fontWeight: "500",
    color: "#283671",
  },
  descriptionText: {
    fontSize: 20,
    color: "#283671",
    maxWidth: deviceWidth * 0.8,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
    width: width * 0.6,
    backgroundColor: "#283671",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 15,
    color: COLORS.white,
  },
});
