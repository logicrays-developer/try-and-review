import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Button as ReactButton,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../styles";
import { deviceWidth } from "../utils/Dimension";
import Icon from "react-native-vector-icons/Ionicons";

type ButtonProps = React.ComponentPropsWithRef<typeof ReactButton> & {
  title: string;
  disable?: boolean;
  onPress: () => void;
  containerStyles?: object;
  titleStyles?: object;
  iconName?: string;
  isProgress?: boolean;
};

export const Button = ({
  title,
  disable,
  onPress,
  containerStyles,
  titleStyles,
  iconName,
  isProgress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: disable ? COLORS.primary : COLORS.lightGreen },
        containerStyles,
      ]}
      disabled={disable}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {iconName && <Icon name={iconName} size={16} />}
      {isProgress ? (
        <ActivityIndicator color={COLORS.white} size={"small"} />
      ) : (
        <Text style={[styles.title, titleStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.7,
    borderRadius: 5,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    opacity: 0.9,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
