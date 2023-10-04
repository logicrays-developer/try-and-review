import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { makeAuthenticatedGetRequest } from "../../Config/Axios";
import { setUserData } from "../../slices/userSlice";
import { TStateData } from "../../typings/SliceData";

export const Profile = () => {
  const navigation: object | any = useNavigation();
  const dispatch = useDispatch();
  const { userData, serveyCountData } = useSelector(
    (state: TStateData | any) => state.user
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { count_reviews, count_images, count_videos } =
    userData?._embedded?.aggregations;
  const { completion_pourcentage } = userData?._embedded;
  const { first_name, last_name, pictures, email } = userData;

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await dispatch(
          makeAuthenticatedGetRequest(`/api/app/in/users/profile`)
        );
        data?.status === 200 && dispatch(setUserData(data?.data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(
          "Error from profile APIs calling in profile screen....",
          error
        );
      }
    };

    getProfileData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* App header */}
      <View style={styles.headerStyle}>
        <Feather name={"search"} size={28} />
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCknpmdGjBH1Fld_7xTxFrcf_l-TzL4l0vuA&usqp=CAU",
          }}
          style={styles.imageFlag}
          resizeMode="cover"
        />
      </View>
      {/* Profile Content */}
      {loading ? (
        <View style={styles.headerContainer}>
          <ActivityIndicator size={"small"} color={"#F97A02"} />
        </View>
      ) : (
        <ScrollView>
          {/* User Content */}
          <View style={styles.contentView}>
            <Text style={[styles.titleText, { paddingVertical: 10 }]}>
              My Profile
            </Text>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ padding: 5 }}>
                {!pictures ? (
                  <FontAwesome6
                    name="user"
                    size={40}
                    color={"#283671"}
                    style={{ padding: 5 }}
                  />
                ) : (
                  <Image
                    source={{ uri: pictures }}
                    style={{ height: 40, width: 40, borderRadius: 20 }}
                    resizeMode="cover"
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 10, flex: 1 }}>
                <Text style={[styles.titleText, { fontSize: 14 }]}>
                  {first_name + " " + last_name}
                </Text>
                <Text
                  style={[styles.titleText, { color: "gray", fontSize: 12 }]}
                >
                  {email}
                </Text>
                <Progress.Bar
                  progress={completion_pourcentage / 100}
                  color="#4500E7"
                  style={{ marginTop: 7 }}
                  height={7}
                />
                <Text
                  style={{ color: "gray", fontSize: 12, paddingVertical: 3 }}
                >
                  {completion_pourcentage} % profile completed
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boxView}
                onPress={() => console.log("verify email button click")}
              >
                <Text style={styles.boxText}>Verify email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boxView}
                onPress={() => console.log("verify phone button click")}
              >
                <Text style={styles.boxText}>Verify phone number</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.boxView}
                onPress={() => console.log("view profile button click")}
              >
                <Text style={styles.boxText}>View profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
          {/* Extra */}
          <View style={styles.contentView}>
            <Text style={[styles.titleText, { paddingVertical: 10 }]}>
              My Contributions
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: 15,
              }}
            >
              <View style={styles.iconView}>
                <View style={styles._viewBox}>
                  <Text style={styles.buttonText}>
                    {serveyCountData?.length}
                  </Text>
                  <Text style={styles.buttonText}>Survey</Text>
                </View>
                <MaterialIcons name="edit" size={40} color={"#4500E7"} />
              </View>
              <View style={styles.iconView}>
                <View style={styles._viewBox}>
                  <Text style={styles.buttonText}>{count_images}</Text>
                  <Text style={styles.buttonText}>Pictures</Text>
                </View>
                <FontAwesome name="camera" size={40} color={"#4500E7"} />
              </View>
              <View style={styles.iconView}>
                <View style={styles._viewBox}>
                  <Text style={styles.buttonText}>{count_videos}</Text>
                  <Text style={styles.buttonText}>Videos</Text>
                </View>
                <FontAwesome name="video-camera" size={40} color={"#4500E7"} />
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          {/* New extra data */}
          <View style={styles.contentView}>
            <Text style={[styles.titleText, { paddingVertical: 10 }]}>
              My Badges
            </Text>
            <Text style={[styles.titleText, { color: "gray", fontSize: 12 }]}>
              Unlock your badges by leaving comments and publishing pictures and
              videos
            </Text>

            <View style={styles.bottonsContainer}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                activeOpacity={1}
                onPress={() => navigation.navigate("Reward")}
              >
                <View style={styles.button}>
                  <MaterialIcons name="edit" size={40} color={"#4500E7"} />
                </View>
                <Text style={styles.buttonText}>Survey</Text>
              </TouchableOpacity>

              <View style={{ alignItems: "center" }}>
                <View style={styles.button}>
                  <MaterialCommunityIcons
                    name="battery-plus-variant"
                    size={40}
                    color={"#4500E7"}
                  />
                </View>
                <Text style={styles.buttonText}>Polls</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={[styles.button, { backgroundColor: "#E8E8E8" }]}>
                  <Ionicons name="images" size={35} color={"gray"} />
                </View>
                <Text style={styles.buttonText}>Pictures</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={[styles.button, { backgroundColor: "#E8E8E8" }]}>
                  <Ionicons name="play" size={35} color={"gray"} />
                </View>
                <Text style={styles.buttonText}>Videos</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          {/* free data */}
          <View style={styles.contentView}>
            <Text style={[styles.titleText, { paddingVertical: 10 }]}>
              My Badges
            </Text>
            <Text style={[styles.titleText, { color: "gray", fontSize: 12 }]}>
              Unlock your badges by leaving comments and publishing pictures and
              videos
            </Text>

            <View style={styles.bottonsContainer}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                activeOpacity={1}
                onPress={() => navigation.navigate("Reward")}
              >
                <View style={styles.button}>
                  <MaterialIcons name="edit" size={40} color={"#4500E7"} />
                </View>
                <Text style={styles.buttonText}>Survey</Text>
              </TouchableOpacity>

              <View style={{ alignItems: "center" }}>
                <View style={styles.button}>
                  <MaterialCommunityIcons
                    name="battery-plus-variant"
                    size={40}
                    color={"#4500E7"}
                  />
                </View>
                <Text style={styles.buttonText}>Polls</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={[styles.button, { backgroundColor: "#E8E8E8" }]}>
                  <Ionicons name="images" size={35} color={"gray"} />
                </View>
                <Text style={styles.buttonText}>Pictures</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={[styles.button, { backgroundColor: "#E8E8E8" }]}>
                  <Ionicons name="play" size={35} color={"gray"} />
                </View>
                <Text style={styles.buttonText}>Videos</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#CDE9E1",
  },
  contentView: {
    flex: 1,
    padding: 10,
  },
  imageFlag: {
    height: 36,
    width: 36,
    borderRadius: 18,
    marginLeft: 15,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#283671",
  },
  boxView: {
    borderWidth: 0.5,
    borderColor: "gray",
    maxWidth: 200,
    backgroundColor: "#CDE9E1",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  iconView: {
    maxWidth: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: { color: "#283671", fontWeight: "500", padding: 10, fontSize: 12 },
  _viewBox: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "500",
    color: "#283671",
    fontSize: 12,
    paddingVertical: 5,
  },
  separator: { padding: 2, backgroundColor: "#E0E0E0" },
  bottonsContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    marginVertical: 20,
    justifyContent: "space-evenly",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#CDE9E1",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
