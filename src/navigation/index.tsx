import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TStateData } from "../typings/SliceData";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Auth/Login";
import { Form, Home, Profile, Reward, Success } from "../screen/Main";
import { TStackParam } from "../typings/Navigation";

// create stack navigator handler to handle navigation
const Stack = createStackNavigator<TStackParam>();

const AppRouter = () => {
  /**
   * based on accessToken global state from redux, app flow will work
   * if user logged in, go to home else go to Login
   */
  const { accessToken } = useSelector((state: TStateData) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
        initialRouteName={accessToken ? "Home" : "Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Reward" component={Reward} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
