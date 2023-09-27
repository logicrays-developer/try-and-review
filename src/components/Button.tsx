import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Button as ReactButton,
} from 'react-native';
import {COLORS} from '../styles';
import {deviceHeight, deviceWidth} from '../utils/Dimension';

type ButtonProps = React.ComponentPropsWithRef<typeof ReactButton> & {
  title: string;
  disable?: boolean;
  onPress: () => void;
};

export const Button = ({title, disable, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: disable ? COLORS.darkGrey : COLORS.primary},
      ]}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 0.7,
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
