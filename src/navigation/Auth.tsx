import { AuthStackParams } from "../typings/Navigation";
import Login from "../screen/Auth/Login";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStackNavigator = createStackNavigator<AuthStackParams>();

export const Auth = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStackNavigator.Screen name="Login" component={Login} />
      {/* rest auth screen will be here */}
    </AuthStackNavigator.Navigator>
  );
};
