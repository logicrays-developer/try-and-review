import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomHeader = ({navigation}: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/images/logo.png')}
          resizeMode="cover"
          style={{width: 40, height: 40, margin: 5}}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
