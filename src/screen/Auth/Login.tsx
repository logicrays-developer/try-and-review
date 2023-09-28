import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput,
} from "react-native";
import { Button } from "../../components";
import { CustomTextInput } from "../../components";
import { Formik } from "formik";
import { object, string } from "yup";
import { COLORS } from "../../styles";
import { deviceHeight, deviceWidth } from "../../utils/Dimension";
import { useDispatch } from "react-redux";
import { setExistingUser } from "../../redux/slice";
import * as Keychain from "react-native-keychain";

const Login = () => {
  const [activeInputField, setActiveInputField] = useState<string>("");
  const [visibleInput, setVisibleInput] = useState<boolean>(false);
  const dispatch = useDispatch();
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const formValidation = object({
    email: string()
      .matches(emailRegExp, "Please enter valid Email")
      .required("Email field is required"),
    password: string()
      .min(8, "Minimum 8 character required")
      .required("Password field is required"),
  });

  const onLoginPress = async (email: string, password: string) => {
    if (
      email.toLowerCase() === "reactnative@jetdevs.com" &&
      password === "jetdevs@123"
    ) {
      dispatch(setExistingUser(true));
      await Keychain.setGenericPassword(
        JSON.stringify(email),
        JSON.stringify(password)
      );
    } else {
      Alert.alert(
        "User unauthorized ",
        "Please enter valid user's credential",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  };

  return (
    <View style={styles.mainBackground}>
      <StatusBar backgroundColor={COLORS.lightGrey} />
      <SafeAreaView style={styles.mainBackground}>
        {/* Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCknpmdGjBH1Fld_7xTxFrcf_l-TzL4l0vuA&usqp=CAU",
            }}
            style={styles.imageFlag}
            resizeMode="cover"
          />
        </View>

        {/* Login card container */}
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Login</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validateOnMount={true}
              validationSchema={formValidation}
              onSubmit={(values: any) => {
                onLoginPress(values.email, values.password);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <View>
                  {/* Email Input */}
                  <View>
                    <TextInput
                      name={"email"}
                      autoCapitalize="none"
                      placeholderTextColor={
                        activeInputField ? COLORS.lightGrey : "#99a1ac"
                      }
                      style={styles.inputField}
                      placeholder={"Email"}
                      value={values.email}
                      secureTextEntry={false}
                      onFocus={() => setActiveInputField("email")}
                      onBlur={(e) => handleBlur("email")}
                      onChangeText={(text) => handleChange(text)}
                    />
                  </View>
                  {/* <CustomTextInput
                    name="email"
                    placeHolder="Email"
                    value={values.email}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    activeInputField={activeInputField}
                    setActiveInputField={setActiveInputField}
                    errorText={errors.email}
                    isTouched={touched.email}
                  /> */}
                  {/* <CustomTextInput
                    name="password"
                    IconName={visibleInput ? "eye" : "eye-off"}
                    placeHolder="Password"
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    activeInputField={activeInputField}
                    setActiveInputField={setActiveInputField}
                    errorText={errors.password}
                    isTouched={touched.password}
                    secureTextEntry={visibleInput}
                    onPressImage={() => setVisibleInput(!visibleInput)}
                  /> */}
                  <Button
                    title="LOGIN"
                    disable={!isValid}
                    onPress={() => handleSubmit()}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: COLORS.white,
    height: deviceHeight,
  },
  imageContainer: {
    margin: 20,
    position: "absolute",
    right: 0,
  },
  imageFlag: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  container: {
    flex: 1,
    width: deviceWidth * 0.9,
    marginVertical: deviceHeight * 0.2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    mainContainer: {},
    alignSelf: "center",
    shadowColor: COLORS.solidBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  headerContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    color: COLORS.lightDark,
    fontWeight: "bold",
    padding: 10,
  },
  fieldContainer: {
    flex: 1,
    alignItems: "center",
    // marginBottom: deviceHeight * 0.25,
  },
  blankContainer: {
    flex: 0.8,
  },
  inputField: {
    fontSize: 16,
    marginLeft: 12,
  },
});
