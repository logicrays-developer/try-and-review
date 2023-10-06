import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { makeAuthenticatedGetRequest } from "../../Config/Axios";
import { setUserData } from "../../slices/userSlice";

const { height, width } = Dimensions.get("screen");

export const Success = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await dispatch(
          makeAuthenticatedGetRequest(`/api/app/in/users/profile`)
        );
        if (data?.status === 200) {
          dispatch(setUserData(data?.data));
        }
      } catch (error) {
        console.log(
          "Error from profile APIs calling in home-screen....",
          error
        );
      }
    };

    // custom function required to use async-await inside useEffect
    getProfileData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.pistaBackground} />
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
    backgroundColor: COLORS.pistaBackground,
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
    color: COLORS.labelText,
  },
  descriptionText: {
    fontSize: 20,
    color: COLORS.labelText,
    maxWidth: deviceWidth * 0.8,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    height: 50,
    width: width * 0.6,
    backgroundColor: COLORS.labelText,
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
