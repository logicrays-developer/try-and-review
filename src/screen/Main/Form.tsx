import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import MaterialComminityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from "react-native-permissions";

const { height, width } = Dimensions.get("screen");

export const Form = () => {
  const navigation = useNavigation();
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<null | Number>(
    null
  );
  const [questionArr, setQuestionArr] = useState([
    {
      id: 355,
      required: false,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "<p>What's your favourite brand of nuts?</p>",
        answer_type: "text",
        required: false,
        answers: [],
        profiling_information_type: "Education",
      },
    },
    {
      id: 11758,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "Test Question numerique",
        answer_type: "numeric",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 337,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "If yes, please specify your blog URL :",
        answer_type: "textarea",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 327,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "Please select your interest categories",
        answer_type: "checkbox",
        required: true,
        answers: [
          {
            id: 1194,
            answer: "Beauty & health",
            visible: true,
          },
          {
            id: 1195,
            answer: "Food",
            visible: true,
          },
          {
            id: 1196,
            answer: "Baby & Kids",
            visible: true,
          },
          {
            id: 1197,
            answer: "Home",
            visible: true,
          },
          {
            id: 1198,
            answer: "Pets",
            visible: true,
          },
        ],
        profiling_information_type: "Category interest",
      },
    },
    {
      id: 5135,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "What's your youngest child date of birth?",
        answer_type: "date",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 323,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "Do you shop online ?",
        answer_type: "radio",
        required: true,
        answers: [
          {
            id: 1157,
            answer: "Yes",
            visible: true,
          },
          {
            id: 1158,
            answer: "No",
            visible: true,
          },
        ],
        profiling_information_type: null,
      },
    },
    {
      id: 324,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "How many people live in your household?",
        answer_type: "select",
        required: true,
        answers: [
          {
            id: 1159,
            answer: "1",
            visible: true,
          },
          {
            id: 1160,
            answer: "2",
            visible: true,
          },
          {
            id: 1161,
            answer: "3",
            visible: true,
          },
          {
            id: 1162,
            answer: "4",
            visible: true,
          },
          {
            id: 1163,
            answer: "5",
            visible: true,
          },
          {
            id: 1164,
            answer: "+5",
            visible: true,
          },
        ],
        profiling_information_type: null,
      },
    },
    {
      id: 11097,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title:
          "<p>Please upload a selfie of yourself, showing your skin condition clearly. We would screen applicants with suitable skin for this trial.</p>",
        answer_type: "image",
        required: true,
        answers: [],
        profiling_information_type: "",
      },
    },
    {
      id: 11495,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "<p>If you have a video to upload, please attach it here:</p>",
        answer_type: "video",
        required: true,
        answers: [],
        profiling_information_type: "MP Video 1",
      },
    },
    {
      id: 13789,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title:
          "<p>Could you provide your profile username for your Twitter account?</p>",
        answer_type: "social username",
        required: true,
        answers: [],
        profiling_information_type: "Twitter name",
      },
    },
    {
      id: 13791,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title:
          "<p>Could you provide your profile link URL for your Youtube account?</p>",
        answer_type: "url",
        required: true,
        answers: [],
        profiling_information_type: "Youtube name",
      },
    },
    {
      id: 11389,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "What is your second child's rating for the TASTE of the milk?",
        answer_type: "rating",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 11753,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "test scale 0-5",
        answer_type: "scale",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 11754,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title: "test scale 0-10",
        answer_type: "scale-10",
        required: true,
        answers: [],
        profiling_information_type: null,
      },
    },
    {
      id: 11116,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title:
          "Please rank (from highest to lowest) the level of their influence on your purchase decision:",
        answer_type: "rankingOfCriteria",
        required: true,
        answers: [
          {
            id: 41843,
            answer: "Dentists",
            visible: true,
          },
          {
            id: 41844,
            answer: "Family and friends",
            visible: true,
          },
          {
            id: 41845,
            answer: "Influencers",
            visible: true,
          },
          {
            id: 41846,
            answer: "Others",
            visible: true,
          },
        ],
        profiling_information_type: null,
      },
    },
    {
      id: 11237,
      required: true,
      parent_id: 0,
      triggers: [],
      leaf: false,
      question: {
        title:
          "<p>Please select the appropriate boxes. Please leave blank ONLY if the statement does not apply to you. The tested shampoo....</p>",
        answer_type: "checkboxGrid",
        required: true,
        answers: [
          {
            id: 42328,
            answer: "cleanses my hair thoroughly",
            visible: true,
          },
          {
            id: 42329,
            answer: "frees my scalp of excess oil",
            visible: true,
          },
          {
            id: 42330,
            answer: "leaves a refreshing feeling on my scalp",
            visible: true,
          },
          {
            id: 42331,
            answer: "prevents my hair from becoming greasy too quickly",
            visible: true,
          },
          {
            id: 42332,
            answer: "prevents my scalp from becoming greasy too quickly",
            visible: true,
          },
          {
            id: 42333,
            answer: "is gentle on my scalp",
            visible: true,
          },
          {
            id: 42334,
            answer: "reduces itching on my scalp",
            visible: true,
          },
          {
            id: 42335,
            answer: "reduces the burning on my scalp",
            visible: true,
          },
          {
            id: 42336,
            answer: "reduces my dandruff",
            visible: true,
          },
          {
            id: 42337,
            answer: "reduces the smell on my scalp",
            visible: true,
          },
          {
            id: 42338,
            answer: "reduces redness",
            visible: false,
          },
        ],
        profiling_information_type: "",
        checklist_grid: [
          {
            title: "Strongly agree",
          },
          {
            title: "Agree",
          },
          {
            title: "Neither agree nor disagree",
          },
          {
            title: "Disagree",
          },
          {
            title: "Strongly disagree",
          },
        ],
      },
    },
  ]);
  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();
  let qIndex = 0;

  // useEffect(() => {
  //   let questionsArray: any[] = [];
  //   const getQuestions = async () => {
  //     // TODO get questions list here
  //     const response = await fetch(`/mobile/cms_forms/59`);
  //     if (response.status === 200) {
  //       response.data?.data.form_sections.forEach(
  //         (item: any, sIndex: number) => {
  //           item.cms_questions.forEach((question: any, index: number) => {
  //             question.sIndex = sIndex;
  //             question.cms_section_id = item.id;
  //             question.qIndex = qIndex;
  //             question.cms_question_id = question.id;
  //             question.uploadImage = [];
  //             if (question.cms_questiion_type === "File upload") {
  //               question.documents = [];
  //             }
  //             questionsArray.push(question);
  //             qIndex = qIndex + 1;
  //           });
  //         }
  //       );
  //       setQuestions(questionsArray);
  //       setLoading(false);
  //     } else {
  //       if (!response.data.data) {
  //         Alert.alert("Error", response.data?.message, [
  //           { text: "Ok", onPress: () => navigation.goBack() },
  //         ]);
  //       } else {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   getQuestions();
  // }, []);

  const requestCameraPermission = async () => {
    const granted = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );
    if (granted === RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        "Permission Required",
        "Please give permission to access Camera from settings.",
        [
          {
            text: "Okay",
            onPress: () => {},
          },
        ]
      );
      return false;
    }
  };

  const requestStoragePermission = async () => {
    const granted = await requestMultiple(
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.MEDIA_LIBRARY]
        : [
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          ]
    );
    console.log("Permission here----", granted);
    if (
      granted["android.permission.READ_MEDIA_IMAGES"] === RESULTS.GRANTED &&
      granted["android.permission.READ_MEDIA_VIDEO"] === RESULTS.GRANTED
    ) {
      return true;
    } else {
      Alert.alert(
        "Permission Required",
        "Please give permission to access Read-Write Storage from settings.",
        [
          {
            text: "Okay",
            onPress: () => {},
          },
        ]
      );
      return false;
    }
  };

  const onImagePickerPress = async () => {
    let checkPermission = await requestStoragePermission();
    if (checkPermission) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then((image) => {
        console.log(image);
      });
    }
  };

  const onImageCameraPress = async () => {
    let checkPermission = await requestCameraPermission();
    if (checkPermission) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then((image) => {
        console.log(image);
      });
    }
  };

  const onVideoPickerPress = async () => {
    let checkPermission = await requestStoragePermission();
    if (checkPermission) {
      ImagePicker.openPicker({
        mediaType: "video",
      }).then((video) => {
        console.log(video);
      });
    }
  };

  const onVideoCameraPress = async () => {
    let checkPermission = await requestCameraPermission();
    if (checkPermission) {
      ImagePicker.openCamera({
        mediaType: "video",
      }).then((image) => {
        console.log(image);
      });
    }
  };

  const _renderAnswer = (data: any, qIndex: number) => {
    switch (data.question.answer_type) {
      case "select":
        return (
          <View key={qIndex}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data.question?.answers}
              maxHeight={300}
              labelField="answer"
              valueField="id"
              placeholder="Select item"
              value={data.question?.ans?.option}
              onChange={(item) => {
                data.question.ans = item;
                setQuestionArr(questionArr);
              }}
            />
          </View>
        );
      case "checkbox":
        return (
          <View style={styles.MultipleChoiceContainer}>
            {data.question.answers.map((option: any, oIndex: number) => {
              return (
                <View style={styles.MultipleChoiceView} key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      data.question?.ans?.includes(option.id)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      if (data.question.ans?.includes(option.id)) {
                        let delItemIndex = data.question.ans.indexOf(option.id);
                        data.question.ans.splice(delItemIndex, 1);
                      } else {
                        if (!data.question.ans) {
                          data.question.ans = [];
                        }
                        data.question.ans.push(option.id);
                      }
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                  <Text
                    style={[styles.MultipleChoiceText, { maxWidth: "80%" }]}
                  >
                    {option.answer}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      case "checkboxGrid":
        return (
          <View style={styles.MultipleChoiceContainer}>
            {data.question.answers.map((option: any, oIndex: number) => {
              return (
                <View style={styles.MultipleChoiceView} key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      data.question?.ans?.includes(option.id)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      if (data.question.ans?.includes(option.id)) {
                        let delItemIndex = data.question.ans.indexOf(option.id);
                        data.question.ans.splice(delItemIndex, 1);
                      } else {
                        if (!data.question.ans) {
                          data.question.ans = [];
                        }
                        data.question.ans.push(option.id);
                      }
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                  <Text
                    style={[styles.MultipleChoiceText, { maxWidth: "80%" }]}
                  >
                    {option.answer}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      case "numeric":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeQuestionIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={15}
            value={data.question.ans}
            placeholder="Enter Number"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveQuestionIndex(qIndex);
            }}
            onBlur={() => {
              setActiveQuestionIndex(null);
            }}
            onChangeText={(val) => {
              data.question.ans = val;
              setRef(!ref);
            }}
          />
        );
      case "text":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeQuestionIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={50}
            value={data.question.ans}
            placeholder="Enter Value"
            keyboardType="email-address"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveQuestionIndex(qIndex);
            }}
            onBlur={() => {
              setActiveQuestionIndex(null);
            }}
            onChangeText={(val) => {
              data.question.ans = val;
              setRef(!ref);
            }}
          />
        );
      case "social username":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeQuestionIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={50}
            value={data.question.ans}
            placeholder="Enter Value"
            keyboardType="email-address"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveQuestionIndex(qIndex);
            }}
            onBlur={() => {
              setActiveQuestionIndex(null);
            }}
            onChangeText={(val) => {
              data.question.ans = val;
              setRef(!ref);
            }}
          />
        );
      case "url":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeQuestionIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={50}
            value={data.question.ans}
            placeholder="Enter Value"
            keyboardType="email-address"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveQuestionIndex(qIndex);
            }}
            onBlur={() => {
              setActiveQuestionIndex(null);
            }}
            onChangeText={(val) => {
              data.question.ans = val;
              setRef(!ref);
            }}
          />
        );
      case "textarea":
        return (
          <TextInput
            style={[
              styles.multiLineInput,
              {
                backgroundColor:
                  activeQuestionIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={1000}
            multiline={true}
            value={data.question.ans}
            placeholder="Enter Description"
            keyboardType="default"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveQuestionIndex(qIndex);
            }}
            onBlur={() => {
              setActiveQuestionIndex(null);
            }}
            onChangeText={(val) => {
              data.question.ans = val;
              setRef(!ref);
            }}
          />
        );
      case "radio":
        return data.question.answers?.map((option: any, oIndex: number) => {
          return (
            <View style={styles.booleanOption} key={oIndex}>
              <MaterialComminityIcons
                name={
                  data.question.ans?.id === option.id
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={25}
                color={COLORS.solidBlack}
                onPress={() => {
                  data.question.ans = option;
                  setQuestionArr(questionArr);
                  setRef(!ref);
                }}
              />
              <Text style={styles.MultipleChoiceText}>{option.answer}</Text>
            </View>
          );
        });
      case "date":
        return (
          <View style={styles.dateContainer}>
            <MaterialComminityIcons
              name="calendar"
              size={25}
              color={COLORS.solidBlack}
              onPress={() => {
                setActiveQuestionIndex(qIndex);
              }}
            />
            <View style={styles.dateDetails}>
              <Text style={styles.MultipleChoiceText}>
                {data.question.ans
                  ? data.question.ans.toLocaleDateString()
                  : "Select Date"}
              </Text>
            </View>
            <DatePicker
              modal
              open={activeQuestionIndex === qIndex}
              date={data.question.ans ? data.question.ans : today}
              mode="date"
              onConfirm={(date) => {
                setActiveQuestionIndex(null);
                data.question.ans = date;
                setQuestionArr(questionArr);
                setRef(!ref);
              }}
              onCancel={() => {
                setActiveQuestionIndex(null);
              }}
            />
          </View>
        );
      case "image":
        return (
          <View>
            <TouchableOpacity
              style={styles.fileUploadContainer}
              onPress={() => {
                setActiveQuestionIndex(qIndex);
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialComminityIcons
                  name="plus"
                  size={25}
                  color={COLORS.solidBlack}
                />
                <Text style={styles.MultipleChoiceText}>Image</Text>
              </View>
            </TouchableOpacity>
            <Modal
              isVisible={activeQuestionIndex === qIndex}
              backdropOpacity={0.8}
              backdropColor={COLORS.darkGrey}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.headerText}>Choose image from</Text>
                <View style={styles.pickerOptionsContainer}>
                  <TouchableOpacity
                    style={[styles.booleanOption]}
                    onPress={() => {
                      onImageCameraPress();
                      setActiveQuestionIndex(null);
                    }}
                  >
                    <MaterialComminityIcons
                      name={"radiobox-blank"}
                      size={25}
                      color={COLORS.solidBlack}
                      onPress={() => {}}
                    />
                    <Text style={[styles.questionText, { marginLeft: 5 }]}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.booleanOption}
                    onPress={() => {
                      onImagePickerPress();
                      setActiveQuestionIndex(null);
                    }}
                  >
                    <MaterialComminityIcons
                      name={"radiobox-blank"}
                      size={25}
                      color={COLORS.solidBlack}
                      onPress={() => {}}
                    />
                    <Text style={[styles.questionText, { marginLeft: 5 }]}>
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.nextButton, { marginTop: 20 }]}
                  onPress={() => {
                    setActiveQuestionIndex(null);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        );
      case "video":
        return (
          <View>
            <TouchableOpacity
              style={styles.fileUploadContainer}
              onPress={() => {
                setActiveQuestionIndex(qIndex);
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialComminityIcons
                  name="plus"
                  size={25}
                  color={COLORS.solidBlack}
                />
                <Text style={styles.MultipleChoiceText}>Video</Text>
              </View>
            </TouchableOpacity>
            <Modal
              isVisible={activeQuestionIndex === qIndex}
              backdropOpacity={0.8}
              backdropColor={COLORS.darkGrey}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.headerText}>Choose video from</Text>
                <View style={styles.pickerOptionsContainer}>
                  <TouchableOpacity
                    style={[styles.booleanOption]}
                    onPress={() => {
                      onVideoCameraPress();
                      setActiveQuestionIndex(null);
                    }}
                  >
                    <MaterialComminityIcons
                      name={"radiobox-blank"}
                      size={25}
                      color={COLORS.solidBlack}
                      onPress={() => {}}
                    />
                    <Text style={[styles.questionText, { marginLeft: 5 }]}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.booleanOption}
                    onPress={() => {
                      onVideoPickerPress();
                      setActiveQuestionIndex(null);
                    }}
                  >
                    <MaterialComminityIcons
                      name={"radiobox-blank"}
                      size={25}
                      color={COLORS.solidBlack}
                      onPress={() => {}}
                    />
                    <Text style={[styles.questionText, { marginLeft: 5 }]}>
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.nextButton, { marginTop: 20 }]}
                  onPress={() => {
                    setActiveQuestionIndex(null);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        );
      case "rating":
        return (
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((option: any, oIndex: number) => {
              return (
                <View key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      data.question.ans >= oIndex + 1 ? "star" : "star-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      data.question.ans = oIndex + 1;
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                </View>
              );
            })}
          </View>
        );
      case "scale":
        return (
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((option: any, oIndex: number) => {
              return (
                <View key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      data.question.ans >= oIndex + 1 ? "star" : "star-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      data.question.ans = oIndex + 1;
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                </View>
              );
            })}
          </View>
        );
      case "scale-10":
        return (
          <View style={styles.ratingContainer}>
            {[...Array(10)].map((option: any, oIndex: number) => {
              return (
                <View key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      data.question.ans >= oIndex + 1 ? "star" : "star-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      data.question.ans = oIndex + 1;
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                </View>
              );
            })}
          </View>
        );
      case "rankingOfCriteria":
        return data.question.answers.map((option: any, oIndex: number) => {
          return (
            <View style={styles.booleanOption} key={oIndex}>
              <Text style={styles.rankingOptionText}>{option.answer}</Text>
              <View style={styles.rankingCriteriaContainer}>
                {data.question.answers.map((opt: any, sIndex: number) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.rankingOptionContainer,
                        {
                          backgroundColor:
                            data.question.ans &&
                            data.question.ans[oIndex]?.answerIndex === sIndex
                              ? "#CDE9E1"
                              : COLORS.liteWhite,
                        },
                      ]}
                      key={sIndex}
                      onPress={() => {
                        if (!data.question.ans) {
                          data.question.ans = [
                            ...Array(data.question.answers.length),
                          ];
                        }
                        data.question.ans[oIndex] = {
                          optionIndex: oIndex,
                          answerIndex: sIndex,
                        };
                        setQuestionArr(questionArr);
                        setRef(!ref);
                      }}
                    >
                      <Text>{sIndex + 1}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        });
      default:
        break;
    }
  };

  const _renderQuestion = (question: any, qIndex: number) => {
    return (
      <View style={{ marginVertical: 10 }} key={qIndex}>
        <Text style={styles.questionText}>{question.question.title}</Text>
        <View style={{ marginTop: 10 }}>{_renderAnswer(question, qIndex)}</View>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: COLORS.lightGrey, flex: 1 }}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerStyle}>
            <Feather name={"search"} size={24} color={COLORS.solidBlack} />
          </View>
          <View style={styles.backBar}>
            <MaterialComminityIcons
              name="keyboard-backspace"
              size={25}
              color={COLORS.solidBlack}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Application</Text>
              <Text style={{ fontSize: 14 }}>Step 1</Text>
            </View>
          </View>
          <ScrollView style={styles.contentContainer}>
            {questionArr.map((question, qIndex) =>
              _renderQuestion(question, qIndex)
            )}
            <TouchableOpacity style={styles.nextButton}>
              <Text>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  headerStyle: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#CDE9E1",
  },
  backBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.solidBlack,
  },
  contentContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  questionText: {
    fontSize: 16,
    color: COLORS.solidBlack,
    fontWeight: "500",
  },
  dropdown: {
    borderColor: COLORS.darkGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: COLORS.liteWhite,
  },
  placeholderStyle: {
    color: COLORS.placeText,
    fontSize: 14,
  },
  selectedTextStyle: {
    color: COLORS.solidBlack,
    fontSize: 14,
  },
  MultipleChoiceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  MultipleChoiceView: {
    flexDirection: "row",
    marginVertical: 3,
    alignItems: "flex-start",
    width: "50%",
  },
  MultipleChoiceText: {
    paddingLeft: 3,
    flexWrap: "wrap",
    fontSize: 13,
    color: COLORS.solidBlack,
  },
  singleLineInput: {
    borderColor: COLORS.darkGrey,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  multiLineInput: {
    borderColor: COLORS.darkGrey,
    textAlignVertical: "top",
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
    paddingHorizontal: 10,
  },
  booleanOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  dateDetails: {
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.liteWhite,
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  fileUploadContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.liteWhite,
    maxWidth: 100,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankingOptionText: {
    paddingLeft: 3,
    width: "50%",
    includeFontPadding: false,
    flexWrap: "wrap",
    fontSize: 13,
    color: COLORS.solidBlack,
  },
  rankingOptionContainer: {
    height: 20,
    maxWidth: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.solidBlack,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rankingCriteriaContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
  nextButton: {
    height: 40,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F97A02",
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    width: width * 0.8,
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  pickerOptionsContainer: {
    marginTop: 20,
    height: 70,
    justifyContent: "space-between",
  },
});
