import React, {useState} from 'react';
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
} from 'react-native';
import {Button, CustomTextInput} from '../../components';
import {Formik} from 'formik';
import {object, string} from 'yup';
import {COLORS} from '../../styles';
import {deviceHeight, deviceWidth} from '../../utils/Dimension';
import {useDispatch} from 'react-redux';
import {setExistingUser} from '../../redux/slice';
import * as Keychain from 'react-native-keychain';

const Login = () => {
  const [activeInputField, setActiveInputField] = useState<string>('');
  const dispatch = useDispatch();
  const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const formValidation = object({
    email: string()
      .matches(emailRegExp, 'Please enter valid Email')
      .required('Email field is required'),
    password: string()
      .min(8, 'Minimum 8 character required')
      .required('Password field is required'),
  });

  const onLoginPress = async (email: string, password: string) => {
    if (
      email.toLowerCase() === 'reactnative@jetdevs.com' &&
      password === 'jetdevs@123'
    ) {
      dispatch(setExistingUser(true));
      await Keychain.setGenericPassword(JSON.stringify(email), JSON.stringify(password));
    } else {
      Alert.alert(
        'User unauthorized ',
        "Please enter valid user's credential",
        [{text: 'OK', onPress: () => {}}],
      );
    }
  };

  return (
    <View style={styles.mainBackground}>
      <StatusBar backgroundColor={COLORS.lightGrey} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.mainBackground}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={{height: 50, width: 50}}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>LOGIN</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validateOnMount={true}
                validationSchema={formValidation}
                onSubmit={(values: any) => {
                  onLoginPress(values.email, values.password);
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <>
                    <CustomTextInput
                      name="email"
                      IconName="email"
                      placeHolder="Email"
                      value={values.email}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      activeInputField={activeInputField}
                      setActiveInputField={setActiveInputField}
                      errorText={errors.email}
                      isTouched={touched.email}
                    />
                    <CustomTextInput
                      name="password"
                      IconName="lock"
                      placeHolder="Password"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      activeInputField={activeInputField}
                      setActiveInputField={setActiveInputField}
                      errorText={errors.password}
                      isTouched={touched.password}
                      secureTextEntry={true}
                    />
                    <Button
                      title="LOGIN"
                      disable={!isValid}
                      onPress={() => handleSubmit()}
                    />
                  </>
                )}
              </Formik>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainBackground: {
    backgroundColor: COLORS.lightGrey,
    height: deviceHeight,
  },
  container: {
    flex: 1,
    width: deviceWidth * 0.85,
    marginVertical: deviceHeight * 0.1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    mainContainer: {},
    alignSelf: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: -30,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    color: COLORS.solidBlack,
    fontWeight: '500',
  },
  fieldContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: deviceHeight * 0.25,
  },
  blankContainer: {
    flex: 0.8,
  },
});
