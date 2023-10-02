import React, { createRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Label } from "../../components/index";
import { CustomTextInput } from "../../components/index";
import { Formik } from "formik";
import { object, string } from "yup";
import { COLORS } from "../../styles";
import { deviceHeight, deviceWidth } from "../../utils/Dimension";
import { useDispatch } from "react-redux";
import * as Keychain from "react-native-keychain";
import { useNavigation } from "@react-navigation/native";
import { makeAuthenticatedPostRequest } from "../../Config/Axios";
import { setAccessToken, setRefreshToken } from "../../slices/userSlice";

const Login = () => {
  const navigation: object | any = useNavigation();
  const passwordRef: object | any = createRef();
  const [visibleInput, setVisibleInput] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);
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
    setIsVisible(true);
    const params = {
      username: email,
      password: password,
    };
    const data = await dispatch(
      makeAuthenticatedPostRequest("/api/app/login", params)
    );
    if (data.status == 200) {
      dispatch(setAccessToken(data?.data?.token));
      dispatch(setRefreshToken(data?.data?.refresh_token));

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      });
      setIsVisible(false);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainBackground}>
      <KeyboardAvoidingView style={styles.mainBackground} behavior="padding">
        {/* Image container */}
        <TouchableOpacity activeOpacity={0.6} style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCknpmdGjBH1Fld_7xTxFrcf_l-TzL4l0vuA&usqp=CAU",
            }}
            style={styles.imageFlag}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Login card container */}
        <View style={styles.container}>
          <Label
            title="Login"
            containerStyle={styles.headerContainer}
            titleStyle={styles.headerText}
          />
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
                  <CustomTextInput
                    name="email"
                    value={values.email}
                    placeHolder={"Email"}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    onNextFocus={() => passwordRef.current.focus()}
                    errorText={errors.email}
                    isTouched={touched.email}
                  />

                  {/* Password Input */}
                  <CustomTextInput
                    name="password"
                    ref={passwordRef}
                    containerStyles={{
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 0,
                    }}
                    inputStyles={{ flex: 1 }}
                    value={values.password}
                    placeHolder="Password"
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    onPressImage={() => setVisibleInput(!visibleInput)}
                    secureTextEntry={visibleInput}
                    IconName={visibleInput ? "eye" : "eye-off"}
                    errorText={errors.password}
                    isTouched={touched.password}
                  />

                  {/* Forgot Password */}
                  <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>

                  {/* Sign in Button */}
                  <Button
                    title="Sign In"
                    progress={isVisible}
                    disable={!isValid}
                    onPress={() => handleSubmit()}
                  />

                  {/* Divider */}
                  <Label title="- OR -" containerStyle={{ marginTop: 10 }} />

                  {/* Social Login Button */}
                  <Button
                    title="Sign in via Facebook"
                    containerStyles={styles.buttonContainer}
                    titleStyles={styles.buttonText}
                    iconName={"logo-facebook"}
                    onPress={() => console.log("Login with facebook action")}
                  />

                  <Button
                    title="Sign in via Google"
                    containerStyles={styles.buttonContainer}
                    titleStyles={styles.buttonText}
                    iconName={"logo-google"}
                    onPress={() => console.log("Login with google action")}
                  />
                </View>
              )}
            </Formik>

            {/* Sign-up button */}
            <View
              style={{
                marginTop: `${deviceHeight * 0.025}%`,
              }}
            >
              <Text style={[styles.headerText, { fontSize: 13, padding: 0 }]}>
                Don't have an account yet?
              </Text>
              <TouchableOpacity
                onPress={() => console.log("Sign Up action button")}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { fontWeight: "bold", alignSelf: "center" },
                  ]}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: `${deviceHeight * 0.025}%`,
              }}
            >
              <Text style={[styles.headerText, { fontSize: 13, padding: 0 }]}>
                @2023 Try & Review, All Rights Reserved.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: COLORS.white,
    flex: 1,
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
    height: deviceHeight / 2,
    width: deviceWidth * 0.9,
    marginVertical: deviceHeight * 0.2,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: COLORS.solidBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerContainer: {
    paddingVertical: 5,
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
  },
  forgotPasswordText: {
    fontWeight: "600",
    textDecorationLine: "underline",
    color: COLORS.primary,
    fontSize: 13,
  },
  forgotPasswordContainer: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginBottom: 15,
    marginTop: -10,
  },
  buttonContainer: {
    backgroundColor: COLORS.buttonBackground,
    marginTop: 10,
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    flexDirection: "row",
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 12,
    marginStart: 5,
  },
});
