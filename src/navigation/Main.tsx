import { MainStackParams } from "../typings/Navigation";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Profile, Form } from "../screen/Main";
import { Success } from "../screen/Main";

const MainStackNavigator = createStackNavigator<MainStackParams>();

export const Main = () => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName="Success"
      screenOptions={{ headerShown: false }}
    >
      <MainStackNavigator.Screen name="Home" component={Home} />
      <MainStackNavigator.Screen name="Profile" component={Profile} />
      <MainStackNavigator.Screen name="Form" component={Form} />
      <MainStackNavigator.Screen name="Success" component={Success} />
    </MainStackNavigator.Navigator>
  );
};
