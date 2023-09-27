import { MainStackParams } from "../typings/Navigation";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screen/Main";

const MainStackNavigator = createStackNavigator<MainStackParams>();

export const Main = () => {
  return (
    <MainStackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <MainStackNavigator.Screen name="Home" component={Home} />
    </MainStackNavigator.Navigator>
  );
};
