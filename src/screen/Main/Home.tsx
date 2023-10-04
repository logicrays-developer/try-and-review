import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../styles";
import { IMAGES } from "../../utils/ImageSource";
import { deviceWidth } from "../../utils/Dimension";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { makeAuthenticatedGetRequest } from "../../Config/Axios";
import { setUserData } from "../../slices/userSlice";
import { TStateData } from "../../typings/SliceData";

/**
 * static data for form ids, based on these form ids form question will fetch
 */
const surveyData = [
  {
    id: "650db838123a4",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: "610a238e664c2",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: "60e6d3395efbe",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: "63c03b1fa8931",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: "5f4cd14f75ec6",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: "5dfade14e1c05",
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
];

export const Home = () => {
  /**
   * import global states here
   * define new states here
   * use hooks at the top of main function if possible
   */
  const navigation: object | any = useNavigation();
  const [loading, setLoading] = useState(false);
  const { userData, serveyCountData } = useSelector(
    (state: TStateData | any) => state.user
  );

  const dispatch = useDispatch();

  /**
   * fetching user profile data if it is not exist in storage
   * get data here as it is required in survey form submission
   * url parameter slug is used as 'in' here
   */
  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      try {
        const data = await dispatch(
          makeAuthenticatedGetRequest(`/api/app/in/users/profile`)
        );
        if (data?.status === 200) {
          dispatch(setUserData(data?.data));
        }
        setLoading(false);
      } catch (error) {
        console.log(
          "Error from profile APIs calling in home-screen....",
          error
        );
        setLoading(false);
      }
    };

    // custom function required to use async-await inside useEffect
    !userData?.first_name && getProfileData();
  }, []);

  // api for homescreen not available. so, static data used
  const renderHeader = () => {
    return (
      <View style={{ flex: 1 }}>
        {/* Completed surveys counts display here */}
        <View style={styles.surveyCountContainer}>
          <View>
            <Text style={styles.completedSurveysCountText}>
              {serveyCountData?.length}
              {/* {userData?._embedded?.aggregations?.count_reviews} */}
            </Text>
          </View>

          <View style={styles.outOfMainContainer}>
            <View style={styles.outOfCountContainer}>
              <Text style={styles.surveysText}>Surveys</Text>
            </View>
            <View>
              <Text style={styles.totalOfCountText}>/100</Text>
            </View>
          </View>
        </View>

        {/* Surveys description */}
        <View style={styles.surveysDescriptionContainer}>
          <Text
            style={{
              textAlign: "justify",
              color: COLORS.lightDark,
              fontSize: 13,
            }}
          >
            Surveys can be used for a variety of purchase such on market
            resource publish and optimize serves, social and research program
            evolutions
          </Text>
        </View>

        {/* Surveys reviews */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.surveyReviewContainer}
          onPress={() => navigation?.navigate("Profile")}
        >
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
            }}
            style={[styles.imageReview, { backgroundColor: COLORS.lightGrey }]}
            resizeMode="cover"
          />
          <Text style={styles.descriptionText}>
            <Text style={{ fontSize: 13 }}>
              Featured respondent for the month of May 2023!
            </Text>
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: "bold" }}>
          Try and Review Community Surveys
        </Text>
      </View>
    );
  };

  //individual survey card with static form id data
  const reviewCard = (item: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ padding: deviceWidth / 70 }}
        onPress={() =>
          navigation?.navigate("Form", {
            questionId: item?.item?.id,
          })
        }
      >
        <Image
          source={{ uri: item?.item?.imgName }}
          style={{
            height: deviceWidth / 4 - 30,
            width: deviceWidth / 4 - 30,
            borderRadius: 10,
            backgroundColor: COLORS.lightGrey,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.headerContainer}>
          <ActivityIndicator size={"small"} color={"#F97A02"} />
        </View>
      ) : (
        <React.Fragment>
          <View style={styles.topContainer}>
            <ImageBackground
              source={IMAGES.andLogo}
              style={styles.backgroundImage}
              resizeMode="cover"
              tintColor={COLORS.lightBackground}
            />
            <Text
              style={[styles.topText, { marginTop: 20, fontWeight: "bold" }]}
            >
              Hi {userData?.first_name + " " + userData?.last_name}
            </Text>
            <Text style={[styles.topText, { marginTop: 5, fontSize: 14 }]}>
              Complete minimum of 10 surveys and question & stand a changes to
              win 1,000 points this month.
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View
              style={{
                paddingHorizontal: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FlatList
                keyExtractor={(item, index) => `card` + index.toString()}
                data={surveyData}
                renderItem={reviewCard}
                ListEmptyComponent={null}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
              />
            </View>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

/**
 * use styles by creating it with StyleSheet at the end of file
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topContainer: {
    flex: 0.15,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 0.85,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  backgroundImage: {
    width: 300,
    height: 300,
    position: "absolute",
    right: -100,
    top: -50,
  },
  topText: {
    color: COLORS.white,
    marginHorizontal: 20,
    fontSize: 16,
  },
  surveyCountContainer: {
    marginTop: 25,
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  completedSurveysCountText: {
    fontSize: 60,
    color: "#384455",
    fontWeight: "500",
  },
  divisionText: {
    fontSize: 20,
    color: "#55505e",
    fontWeight: "500",
  },
  outOfMainContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  outOfCountContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 7,
    paddingHorizontal: 5,
  },
  surveysText: { color: COLORS.white, fontSize: 12 },
  totalOfCountText: { fontSize: 20, color: "#55505e", fontWeight: "500" },
  surveysDescriptionContainer: { marginTop: 20 },
  surveyReviewContainer: {
    marginTop: 25,
    borderRadius: 20,
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
    backgroundColor: COLORS.foodCard,
  },
  imageReview: {
    flex: 1.3,
    height: 100,
    width: 100,
    overflow: "hidden",
    borderRadius: 20,
  },
  descriptionText: {
    flex: 2,
    alignSelf: "center",
    marginHorizontal: 10,
  },
});
