import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../styles";
import { deviceWidth } from "../utils/Dimension";
import Icon from "react-native-vector-icons/Ionicons";
import { FormikErrors, FormikTouched } from "formik";

type InputProps = React.ComponentPropsWithRef<typeof TextInput> & {
  name: string;
  IconName?: string;
  placeHolder: string;
  value: string;
  onBlur: (e: any) => void;
  onChangeText: (text: string | any) => void;
  activeInputField: string;
  setActiveInputField: (text: string) => void;
  errorText:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  isTouched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  secureTextEntry?: boolean;
  onPressImage?: () => void;
};

export const CustomTextInput = ({
  name,
  IconName,
  placeHolder,
  value,
  onBlur,
  onChangeText,
  activeInputField,
  setActiveInputField,
  errorText,
  isTouched,
  secureTextEntry,
  onPressImage,
}: InputProps) => {
  let isPrimaryColor = activeInputField === name || value.length !== 0;

  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderBottomColor: isPrimaryColor
              ? COLORS.primary
              : COLORS.darkGrey,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            name={name}
            autoCapitalize="none"
            placeholderTextColor={
              isPrimaryColor ? COLORS.primary : COLORS.darkGrey
            }
            style={styles.inputField}
            placeholder={placeHolder}
            value={value}
            secureTextEntry={secureTextEntry}
            onFocus={() => setActiveInputField(name)}
            onBlur={(e) => onBlur(e)}
            onChangeText={(text) => onChangeText(text)}
          />
        </View>
        {IconName && (
          <TouchableOpacity onPress={onPressImage}>
            <Icon
              name={IconName}
              size={24}
              color={isPrimaryColor ? COLORS.primary : COLORS.darkGrey}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorContainer}>
        {errorText && isTouched && (
          <Text style={styles.errorText}>{errorText.toString()}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.7,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  inputField: {
    fontSize: 16,
    marginLeft: 12,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.errorText,
    fontWeight: "400",
  },
  errorContainer: {
    height: 20,
    alignSelf: "flex-start",
  },
});
