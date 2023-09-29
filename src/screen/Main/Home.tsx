import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  SectionList,
} from "react-native";
import { COLORS } from "../../styles";
import { IMAGES } from "../../utils/ImageSource";

const surveyData = [
  {
    id: 1,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 2,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 3,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 4,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 5,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 6,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 7,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 8,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 9,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
  {
    id: 10,
    imgName:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
  },
];

export const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImageBackground
          source={IMAGES.andLogo}
          style={styles.backgroundImage}
          resizeMode="cover"
          tintColor={COLORS.lightBackground}
        />
        <Text style={[styles.topText, { marginTop: 20 }]}>Hi Alexia</Text>
        <Text style={[styles.topText, { marginTop: 5, fontSize: 14 }]}>
          Complete minimum of 10 surveys and question & stand a changes to win
          1,000 points this month.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView
          style={{ flex: 1 }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {/* Completed surveys counts */}
          <View style={styles.surveyCountContainer}>
            <View>
              <Text style={styles.completedSurveysCountText}>15</Text>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Text style={styles.divisionText}>/</Text>
            </View>
            <View style={styles.outOfMainContainer}>
              <View style={styles.outOfCountContainer}>
                <Text style={styles.surveysText}>Surveys</Text>
              </View>
              <View>
                <Text style={styles.totalOfCountText}>100</Text>
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
          <View style={styles.surveyReviewContainer}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-DK-y9Msncah3O429hnZZaCdMLn-Y_qLw&usqp=CAU",
              }}
              style={styles.imageReview}
              resizeMode="contain"
            />
            <Text style={styles.descriptionText}>
              <Text style={{ fontSize: 13 }}>
                Featured respondent for the month of May 2023!
              </Text>
            </Text>
          </View>

          <Text style={{ marginHorizontal: 30, marginTop: 20 }}>
            Try and Review Community Surveys
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topContainer: {
    flex: 0.15,
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
    fontSize: 45,
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
    justifyContent: "space-between",
  },
  outOfCountContainer: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 7,
    paddingHorizontal: 5,
  },
  surveysText: { color: COLORS.white, fontSize: 12 },
  totalOfCountText: { fontSize: 20, color: "#55505e", fontWeight: "500" },
  surveysDescriptionContainer: { marginTop: 20, marginHorizontal: 30 },
  surveyReviewContainer: {
    marginTop: 25,
    borderRadius: 20,
    marginHorizontal: 30,
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
  descriptionText: { flex: 2, alignSelf: "center", marginHorizontal: 10 },
});
