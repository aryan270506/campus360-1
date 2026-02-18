import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Screens/Login/Login";
import StudentMain from "./Screens/Students/dashbord/StudentMain"; // adjust path
import timetable from "./Screens/Students/timetable";
import Parentmaindashboard from "./Screens/Parent/Dashboard";
import Dashboardpage from "./Screens/Parent/dashboardpage";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="StudentMain" component={StudentMain} />
           <Stack.Screen name="timetable" component={timetable} />
           <Stack.Screen name="Parentmaindashboard" component={Parentmaindashboard} />
           <Stack.Screen name="Dashboardpage" component={Dashboardpage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}