import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type LabelProp = React.ComponentPropsWithRef<typeof Text> & {
  title: string;
  onPress?: (text: string | any) => void;
  containerStyle?: object;
  titleStyle?: object;
};

export const Label = ({
  title,
  onPress,
  containerStyle,
  titleStyle,
}: LabelProp) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={onPress ? false : true}
    >
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
