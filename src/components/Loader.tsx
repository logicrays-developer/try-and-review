import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS} from '../styles';

export const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={'small'} color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
