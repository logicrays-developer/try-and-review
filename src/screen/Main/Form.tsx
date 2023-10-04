import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
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
import {
  makeAuthenticatedGetRequest,
  makeAuthenticatedPostRequest,
} from "../../Config/Axios";
import { useDispatch } from "react-redux";

const { width } = Dimensions.get("screen");

export const Form = ({ route }: any) => {
  const navigation = useNavigation();
  const { questionId } = route.params;
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<null | Number>(
    null
  );
  const [questionArr, setQuestionArr] = useState([]);
  const dispatch = useDispatch();
  const today = new Date();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await dispatch(
          makeAuthenticatedGetRequest(`/api/app/survey/${questionId}`)
        );
        if (response.status === 200) {
          setQuestionArr(response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        throw error;
      }
      /**
       * if nested question array is there,
       * then need to manage here by flatten with parent_question_id and child_question_id
       */
    };
    getQuestions();
  }, []);

  const formSubmit = async () => {
    let params: any = {};
    questionArr.map((question) => {
      if (question.question?.ans) {
        if (question.question?.answer_type !== "rankingOfCriteria") {
          params[`question_${question.id}`] =
            question.question?.ans?.toString();
        } else {
          let answerString = "";
          question.question?.ans.map((opt) => {
            answerString =
              answerString +
              `${question.question.answers[opt.optionIndex].answer}-${
                opt.answerIndex + 1
              }, `;
          });
          params[`question_${question.id}`] = answerString;
        }
      }
    });
    console.log("Ans here---", params);
  };

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
      (Platform.OS === "android" &&
        granted["android.permission.READ_MEDIA_IMAGES"] === RESULTS.GRANTED &&
        granted["android.permission.READ_MEDIA_VIDEO"] === RESULTS.GRANTED) ||
      (Platform.OS === "ios" &&
        granted["ios.permission.MEDIA_LIBRARY"] === RESULTS.GRANTED &&
        granted["ios.permission.PHOTO_LIBRARY"] === RESULTS.GRANTED)
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
              value={data.question?.ans}
              onChange={(item) => {
                data.question.ans = item.answer;
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
                      data.question?.ans?.includes(option.answer)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      if (data.question.ans?.includes(option.answer)) {
                        let delItemIndex = data.question.ans.indexOf(
                          option.answer
                        );
                        data.question.ans.splice(delItemIndex, 1);
                      } else {
                        if (!data.question.ans) {
                          data.question.ans = [];
                        }
                        data.question.ans.push(option.answer);
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
                      data.question?.ans?.includes(option.answer)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      if (data.question.ans?.includes(option.answer)) {
                        let delItemIndex = data.question.ans.indexOf(
                          option.answer
                        );
                        data.question.ans.splice(delItemIndex, 1);
                      } else {
                        if (!data.question.ans) {
                          data.question.ans = [];
                        }
                        data.question.ans.push(option.answer);
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
                  data.question.ans === option.answer
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={25}
                color={COLORS.solidBlack}
                onPress={() => {
                  data.question.ans = option.answer;
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
              onPress={() => navigation?.goBack()}
            />
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Application</Text>
              <Text style={{ fontSize: 14 }}>Step 1</Text>
            </View>
          </View>
          {loading ? (
            <View
              style={[
                styles.headerContainer,
                { backgroundColor: COLORS.white },
              ]}
            >
              <ActivityIndicator size={"small"} color={"#F97A02"} />
            </View>
          ) : (
            <>
              {questionArr.length ? (
                <ScrollView style={styles.contentContainer}>
                  {questionArr.map((question, qIndex) =>
                    _renderQuestion(question, qIndex)
                  )}
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                      formSubmit();
                    }}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </ScrollView>
              ) : (
                <View style={styles.headerContainer}>
                  <Text style={styles.questionText}>No Data Found.</Text>
                </View>
              )}
            </>
          )}
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
