import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { FormikErrors, FormikTouched } from "formik";

type InputProps = React.ComponentPropsWithRef<typeof TextInput> & {
  name?: string;
  IconName?: string;
  placeHolder: string;
  value: string;
  onBlur: (e: any) => void;
  onChangeText: (text: string | any) => void;
  errorText:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  secureTextEntry?: boolean;
  onPressImage?: () => void;
  containerStyles?: object;
  inputStyles?: object;
  onNextFocus?: any;
};

export const CustomTextInput = React.forwardRef(
  (
    {
      name,
      IconName,
      placeHolder,
      value,
      onBlur,
      onChangeText,
      secureTextEntry,
      errorText,
      isTouched,
      containerStyles,
      inputStyles,
      onPressImage,
      onNextFocus,
    }: InputProps,
    ref: object | any
  ) => (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <View
        style={[
          styles.container,
          containerStyles,
          {
            backgroundColor:
              value.length !== 0 ? COLORS.white : COLORS.liteWhite,
            borderColor:
              value.length !== 0 ? COLORS.darkGrey : COLORS.lightDark,
          },
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.inputField, inputStyles]}
          placeholder={placeHolder}
          value={value}
          onBlur={(e) => onBlur(e)}
          onChangeText={(text) => onChangeText(text)}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onNextFocus}
        />
        {IconName && (
          <TouchableOpacity
            onPress={onPressImage}
            style={{
              padding: 5,
            }}
          >
            <Icon
              name={IconName}
              size={20}
              color={secureTextEntry ? COLORS.darkGrey : COLORS.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {errorText && isTouched ? errorText.toString() : " "}
        </Text>
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputField: {
    padding: 4,
    paddingStart: 10,
  },
  errorContainer: {
    height: 20,
    alignSelf: "flex-start",
  },
  errorText: {
    fontSize: 11.5,
    color: COLORS.errorText,
    alignItems: "center",
    marginStart: 2,
  },
});
