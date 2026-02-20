import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./Screens/Login/Login";
import StudentMain from "./Screens/Students/dashbord/StudentMain"; // adjust path
//import Timetable from "./Screens/Students/timetable";
import Parentmaindashboard from "./Screens/Parent/Dashboard/Dashboard";
import Dashboardpage from "./Screens/Parent/Dashboard/dashboardpage";
import Analytics from "./Screens/Parent/Analytics/Analytics";
import Message from "./Screens/Parent/Message/Message";
import Examresult from "./Screens/Parent/EXAM/Examresult";
import ParentFinance  from "./Screens/Parent/Finance/Finance";
import ParentSchedule from "./Screens/Parent/Schedule/Schedule";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="StudentMain" component={StudentMain} />
           <Stack.Screen name="Parentmaindashboard" component={Parentmaindashboard} />
           <Stack.Screen name="Dashboardpage" component={Dashboardpage} />
           <Stack.Screen name="Analytics" component={Analytics} />
           <Stack.Screen name="Message" component={Message} />
            <Stack.Screen name="Examresult" component={Examresult} /> 
            <Stack.Screen name="ParentFinance" component={ParentFinance} />
            <Stack.Screen name="ParentSchedule" component={ParentSchedule} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}