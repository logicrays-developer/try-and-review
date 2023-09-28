import React, { useState, useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles";

export const Form = () => {
  const navigation = useNavigation();
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [dateOpen, setDateOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(today.getFullYear() - 2);
  maxDate.setFullYear(today.getFullYear() + 2);
  let qIndex = 0;

  useEffect(() => {
    let questionsArray: any[] = [];
    const getQuestions = async () => {
      // TODO get questions list here
      const response = await fetch(`/mobile/cms_forms/59`);
      if (response.status === 200) {
        response.data?.data.form_sections.forEach(
          (item: any, sIndex: number) => {
            item.cms_questions.forEach((question: any, index: number) => {
              question.sIndex = sIndex;
              question.cms_section_id = item.id;
              question.qIndex = qIndex;
              question.cms_question_id = question.id;
              question.uploadImage = [];
              if (question.cms_questiion_type === "File upload") {
                question.documents = [];
              }
              questionsArray.push(question);
              qIndex = qIndex + 1;
            });
          }
        );
        setQuestions(questionsArray);
        setLoading(false);
      } else {
        if (!response.data.data) {
          Alert.alert("Error", response.data?.message, [
            { text: "Ok", onPress: () => navigation.goBack() },
          ]);
        } else {
          setLoading(false);
        }
      }
    };

    getQuestions();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>{/* common Search Header */}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});
