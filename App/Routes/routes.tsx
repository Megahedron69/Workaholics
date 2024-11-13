import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import EmployeeDetailScreen from "../Screens/EmployeeDetailScreen";
import LoginScreen from "../Screens/Login";

import { useAuthStatus } from "../Hooks/useAuthStatus";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const isSignedIn = useAuthStatus();
  return (
    <Stack.Navigator initialRouteName={isSignedIn ? "Home" : "SignIn"}>
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          header: () => null,
          animation: "slide_from_bottom",
        }}
        initialParams={{
          isSignIn: true,
          heading: "Login",
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => null,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="EmployeeDetailScreen"
        component={EmployeeDetailScreen}
        options={{
          header: () => null,
          animation: "slide_from_left",
        }}
      />
    </Stack.Navigator>
  );
}
