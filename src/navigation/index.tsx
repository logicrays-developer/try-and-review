import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TStateData } from "../typings/SliceData";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Auth/Login";
import { Form, Home, Profile, Reward, Success } from "../screen/Main";

const Stack = createStackNavigator();

const AppRouter = () => {
  const { accessToken } = useSelector((state: TStateData) => state.user);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
        initialRouteName={!accessToken ? "Profile" : "Login"}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Reward" component={Reward} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
