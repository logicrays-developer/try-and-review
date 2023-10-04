import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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
import SelectDropdown from "react-native-select-dropdown";
import DatePicker from "react-native-date-picker";
import MaterialComminityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
  request,
} from "react-native-permissions";

//import custom components here
import {
  makeAuthenticatedGetRequest,
  makeAuthenticatedPostRequest,
} from "../../Config/Axios";
import { TStateData, TUserProps } from "../../typings/SliceData";
import { setServeyCountData } from "../../slices/userSlice";
import { COLORS } from "../../styles";

const { width } = Dimensions.get("screen");

export const Form = ({ route }: any) => {
  /**
   * import global states here
   * define new states here
   * use hooks at the top of main function if possible
   */
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const { questionId } = route.params;
  const { userData }: TUserProps = useSelector(
    (state: TStateData) => state.user
  );
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<null | Number>(
    null
  );
  const [questionArr, setQuestionArr] = useState<any[]>([]);
  const today = new Date();

  /**
   * on screen focus, GET api for form question details called once, and using useState hooks
   * store that data in questionArr state.
   * from home screen coming with particular form id for getting data with api as route params named as questionId.
   */
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await dispatch(
          makeAuthenticatedGetRequest(`/api/app/survey/${questionId}`)
        );
        if (response.status === 200) {
          setQuestionArr(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        throw error;
      }
      /**
       * if nested question array is there,
       * then need to manage here by flatten with parent_question_id and child_question_id.
       * Not sufficient information regarding how to manage key params in body for child question when submit form
       * that's why not managed child questions
       */
    };

    // custom function required to use async-await inside useEffect
    getQuestions();
  }, []);

  /**
   * filled form submitting with answer params and Profile params
   * for answer params, all the question have one params added named as "ans"
   * at the level with title of question
   * for GET and POST api call, used common functions named as makeAuthenticatedGetRequest
   * and makeAuthenticatedPostRequest in reducer slice.
   */
  const formSubmit = async () => {
    setLoading(true);
    let profileData: any = {
      birthday: userData?.birth_day,
      parentAuthorization: "on",
      address: userData?.address,
      additionalAddress: userData?.additional_address,
      postalCode: Number(userData?.postal_code),
      city: userData?.city,
      state: userData?.state,
      district: userData?.district,
      subdistrict: userData?.subdistrict,
      province: userData?.province,
      country: userData?.country,
      phone: userData?.phone,
      email: userData?.email,
    };
    let params: any = {};
    questionArr.map((question) => {
      if (question.question?.ans) {
        // preparing params as mentioned in docs
        if (question.question?.answer_type !== "rankingOfCriteria") {
          params[`question_${question.id}`] =
            question.question?.ans?.toString();
        } else {
          let answerString = "";
          question.question?.ans.map((opt: any) => {
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

    //submitting or posting data in server
    try {
      const formSubmitResponse = await dispatch(
        makeAuthenticatedPostRequest(`/api/app/survey/${questionId}`, {
          participation_form: params,
          address_verification_user: profileData,
        })
      );
      /**
       * on Success response, navigate to success screen
       */
      if (formSubmitResponse.status === 200) {
        setLoading(false);
        navigation.navigate("Success");
        dispatch(setServeyCountData(questionId));
      }
    } catch (error: any) {
      setLoading(false);
      dispatch(setServeyCountData(questionId));
    }
  };

  /**
   * requestCameraPermission
   * @returns true/ false for camera usage permission
   */
  const requestCameraPermission = async () => {
    /**
     * PLatform specific Code required for Permissions
     */
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

  /**
   * requestStoragePermission
   * @returns true/ false for media library usage permission
   */
  const requestStoragePermission = async () => {
    /**
     * PLatform specific Code required for Permissions
     */
    const granted = await requestMultiple(
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.MEDIA_LIBRARY]
        : [
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          ]
    );
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

  /**
   * @param qIndex main question array's index used to assign answer in particular that question,
   * for Image and Video question type, integrated image still it's not shown in screen UI
   * and for video only base64 conversion using new FileReader() pending
   */
  const onImagePickerPress = async (qIndex: number) => {
    let checkPermission = await requestStoragePermission();
    if (checkPermission) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then((image) => {
        questionArr[
          qIndex
        ].question.ans = `data:${image.mime};base64,${image.data}`;
        setQuestionArr(questionArr);
        setRef(!ref);
      });
    }
  };

  const onImageCameraPress = async (qIndex: number) => {
    let checkPermission = await requestCameraPermission();
    if (checkPermission) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
      }).then((image) => {
        questionArr[
          qIndex
        ].question.ans = `data:${image.mime};base64,${image.data}`;
        setQuestionArr(questionArr);
        setRef(!ref);
      });
    }
  };

  const onVideoPickerPress = async (qIndex: number) => {
    let checkPermission = await requestStoragePermission();
    if (checkPermission) {
      ImagePicker.openPicker({
        mediaType: "video",
      }).then((video) => {
        console.log("Video result----", video, qIndex);
      });
    }
  };

  const onVideoCameraPress = async (qIndex: number) => {
    let checkPermission = await requestCameraPermission();
    if (checkPermission) {
      ImagePicker.openCamera({
        mediaType: "video",
      }).then((video) => {
        console.log("Video result----", video, qIndex);
      });
    }
  };

  /**
   * @param data - as whole question as an object of array with details
   * @param qIndex - index of that question from main question array
   * based on type of answer_type parameter from question, answer will be render as below from switch-case
   * @returns
   */
  const _renderAnswer = (data: any, qIndex: number) => {
    switch (data.question.answer_type) {
      case "select":
        return (
          <View key={qIndex}>
            <SelectDropdown
              data={data.question?.answers}
              onSelect={(selectedItem, index) => {
                data.question.ans = selectedItem.answer;
                setQuestionArr(questionArr);
              }}
              rowTextForSelection={(item, index) => {
                return item.answer;
              }}
              buttonTextAfterSelection={() => {
                return data.question.ans;
              }}
              dropdownStyle={{ borderRadius: 8 }}
              buttonStyle={styles.dropDownBox}
              renderCustomizedRowChild={(item) => (
                <Text style={{ paddingLeft: 20, fontSize: 16 }}>
                  {item.answer}
                </Text>
              )}
              renderDropdownIcon={() => (
                <MaterialComminityIcons
                  name="chevron-down"
                  size={20}
                  color={COLORS.solidBlack}
                />
              )}
              renderCustomizedButtonChild={() => (
                <Text
                  style={{
                    color: data.question.ans
                      ? COLORS.solidBlack
                      : COLORS.placeText,
                    marginLeft: 3,
                  }}
                >
                  {data.question.ans ? data.question.ans : "Select item"}
                </Text>
              )}
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
                      onImageCameraPress(qIndex);
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
                      onImagePickerPress(qIndex);
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
                      onVideoCameraPress(qIndex);
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
                      onVideoPickerPress(qIndex);
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
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
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
                    <Text style={styles.buttonText}>Next</Text>
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

/**
 * use styles by creating it with StyleSheet at the end of file
 */
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
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 7,
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
  dropDownBox: {
    width: `100%`,
    borderRadius: 8,
    borderWidth: 1,
    height: 38,
    borderColor: COLORS.darkGrey,
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
