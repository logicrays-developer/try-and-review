import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
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

export const Form = () => {
  const navigation = useNavigation();
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [dateOpen, setDateOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [dateModalIndex, setDateModalIndex] = useState<null | Number>(null);
  const [activeTextInputIndex, setActiveTextInputIndex] =
    useState<null | Number>(null);
  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(today.getFullYear() - 2);
  maxDate.setFullYear(today.getFullYear() + 2);
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

  const [questionArr, setQuestionArr] = useState([
    {
      type: "Drop-down",
      id: 1,
      questionText: "How regularly do you use face masks?",
      answerOptions: [
        { value: 1, label: "Regular" },
        { value: 2, label: "Usually" },
        { value: 3, label: "Rerely" },
        { value: 4, label: "Not Used" },
      ],
    },
    {
      type: "Multiple-choice",
      id: 2,
      questionText: "What is the important function of a face mask for you?",
      answerOptions: [
        { id: 1, option: "Nourishing" },
        { id: 2, option: "Moisturizing" },
        { id: 3, option: "Anti-Fatigue, energizing" },
        { id: 4, option: "Toning, revitailizing" },
        { id: 5, option: "Brightening" },
        { id: 6, option: "Relaxing, refreshing" },
      ],
    },
    {
      type: "Number",
      id: 3,
      questionText: "What is your age?",
      answerOptions: [],
    },
    {
      type: "Short-answer",
      id: 4,
      questionText: "What is your current choise?",
      answerOptions: [],
    },
    {
      type: "Long-answer",
      id: 5,
      questionText: "How you use face mask, describe in detail?",
      answerOptions: [],
    },
    {
      type: "Boolean",
      id: 6,
      questionText: "Are you happy with your current choice?",
      answerOptions: [
        { id: 1, option: "Yes" },
        { id: 2, option: "No" },
        { id: 3, option: "N/A" },
      ],
    },
    {
      type: "Date",
      id: 7,
      questionText: "from which date, you start using current choice?",
      answerOptions: [],
    },
    {
      type: "File-upload",
      id: 8,
      questionText: "Any file you want to share with us? attach here.",
      answerOptions: [],
    },
    {
      type: "Text-block",
      id: 9,
      questionText: "Please share your experience with current choice.",
      answerOptions: [],
    },
    {
      type: "Rating",
      id: 10,
      questionText: "Please Rate your current choice.",
      answerOptions: [],
    },
    {
      type: "RankingOfCriteria",
      id: 11,
      questionText: "Please Rank your current influancer.",
      answerOptions: [
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
    },
  ]);

  const _renderAnswer = (question: any, qIndex: number) => {
    switch (question.type) {
      case "Drop-down":
        return (
          <View key={qIndex}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={question.answerOptions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              value={question.answer?.option}
              onChange={(item) => {
                question.answer = item;
                setQuestionArr(questionArr);
              }}
            />
          </View>
        );
      case "Multiple-choice":
        return (
          <View style={styles.MultipleChoiceContainer}>
            {question.answerOptions.map((option: any, oIndex: number) => {
              return (
                <View style={styles.MultipleChoiceView} key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      question.answer?.includes(option.id)
                        ? "checkbox-marked"
                        : "checkbox-blank-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      if (question.answer?.includes(option.id)) {
                        let delItemIndex = question.answer.indexOf(option.id);
                        question.answer.splice(delItemIndex, 1);
                      } else {
                        if (!question.answer) {
                          question.answer = [];
                        }
                        question.answer.push(option.id);
                      }
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                  <Text style={styles.MultipleChoiceText}>{option.option}</Text>
                </View>
              );
            })}
          </View>
        );
      case "Number":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeTextInputIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={15}
            value={question.answer}
            placeholder="Enter Number"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveTextInputIndex(qIndex);
            }}
            onBlur={() => {
              setActiveTextInputIndex(null);
            }}
            onChangeText={(val) => {
              question.answer = val;
              setRef(!ref);
            }}
          />
        );
      case "Short-answer":
        return (
          <TextInput
            style={[
              styles.singleLineInput,
              {
                backgroundColor:
                  activeTextInputIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={30}
            value={question.answer}
            placeholder="Enter Value"
            keyboardType="email-address"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveTextInputIndex(qIndex);
            }}
            onBlur={() => {
              setActiveTextInputIndex(null);
            }}
            onChangeText={(val) => {
              question.answer = val;
              setRef(!ref);
            }}
          />
        );
      case "Long-answer":
        return (
          <TextInput
            style={[
              styles.multiLineInput,
              {
                backgroundColor:
                  activeTextInputIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={1000}
            multiline={true}
            value={question.answer}
            placeholder="Enter Description"
            keyboardType="default"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveTextInputIndex(qIndex);
            }}
            onBlur={() => {
              setActiveTextInputIndex(null);
            }}
            onChangeText={(val) => {
              question.answer = val;
              setRef(!ref);
            }}
          />
        );
      case "Boolean":
        return question.answerOptions.map((option: any, oIndex: number) => {
          return (
            <View style={styles.booleanOption} key={oIndex}>
              <MaterialComminityIcons
                name={
                  question.answer?.id === option.id
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={25}
                color={COLORS.solidBlack}
                onPress={() => {
                  question.answer = option;
                  setQuestionArr(questionArr);
                  setRef(!ref);
                }}
              />
              <Text style={styles.MultipleChoiceText}>{option.option}</Text>
            </View>
          );
        });
      case "Date":
        return (
          <View style={styles.dateContainer}>
            <MaterialComminityIcons
              name="calendar"
              size={25}
              color={COLORS.solidBlack}
              onPress={() => {
                setDateModalIndex(qIndex);
              }}
            />
            <View style={styles.dateDetails}>
              <Text style={styles.MultipleChoiceText}>
                {question.answer
                  ? question.answer.toLocaleDateString()
                  : "Select Date"}
              </Text>
            </View>
            <DatePicker
              modal
              open={dateModalIndex === qIndex}
              date={question.answer ? question.answer : today}
              mode="date"
              onConfirm={(date) => {
                setDateModalIndex(null);
                question.answer = date;
                setQuestionArr(questionArr);
                setRef(!ref);
              }}
              onCancel={() => {
                setDateModalIndex(null);
              }}
            />
          </View>
        );
      case "File-upload":
        return (
          <View>
            <TouchableOpacity style={styles.fileUploadContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialComminityIcons
                  name="plus"
                  size={25}
                  color={COLORS.solidBlack}
                />
                <Text style={styles.MultipleChoiceText}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case "Text-block":
        return (
          <TextInput
            style={[
              styles.multiLineInput,
              {
                backgroundColor:
                  activeTextInputIndex === qIndex
                    ? COLORS.white
                    : COLORS.liteWhite,
              },
            ]}
            maxLength={1000}
            multiline={true}
            value={question.answer}
            placeholder="Enter Details"
            keyboardType="default"
            placeholderTextColor={COLORS.placeText}
            onFocus={() => {
              setActiveTextInputIndex(qIndex);
            }}
            onBlur={() => {
              setActiveTextInputIndex(null);
            }}
            onChangeText={(val) => {
              question.answer = val;
              setRef(!ref);
            }}
          />
        );
      case "Rating":
        return (
          <View style={styles.ratingContainer}>
            {(question.type?.includes("10")
              ? [...Array(10)]
              : [...Array(5)]
            ).map((option: any, oIndex: number) => {
              return (
                <View key={oIndex}>
                  <MaterialComminityIcons
                    name={
                      question.answer >= oIndex + 1 ? "star" : "star-outline"
                    }
                    size={25}
                    color={COLORS.solidBlack}
                    onPress={() => {
                      question.answer = oIndex + 1;
                      setQuestionArr(questionArr);
                      setRef(!ref);
                    }}
                  />
                </View>
              );
            })}
          </View>
        );
      case "RankingOfCriteria":
        return question.answerOptions.map((option: any, oIndex: number) => {
          return (
            <View style={styles.booleanOption} key={oIndex}>
              <Text style={styles.rankingOptionText}>{option.answer}</Text>
              <View style={styles.rankingCriteriaContainer}>
                {question.answerOptions.map((opt: any, sIndex: number) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.rankingOptionContainer,
                        {
                          backgroundColor:
                            question.answer &&
                            question.answer[oIndex]?.answerIndex === sIndex
                              ? "#CDE9E1"
                              : COLORS.liteWhite,
                        },
                      ]}
                      key={sIndex}
                      onPress={() => {
                        if (!question.answer) {
                          question.answer = [
                            ...Array(question.answerOptions.length),
                          ];
                        }
                        question.answer[oIndex] = {
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
        <Text style={styles.questionText}>{question.questionText}</Text>
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
    alignItems: "center",
    width: "50%",
  },
  MultipleChoiceText: {
    paddingLeft: 3,
    includeFontPadding: false,
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
});
