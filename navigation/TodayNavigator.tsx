import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Slider from "@react-native-community/slider";
import TodayScreen from "../screens/TodayScreen";
import Workout from "../screens/Workout";

const Tab = createMaterialTopTabNavigator();

export function TodayNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Diet" component={TodayScreen} />
      <Tab.Screen name="Workout" component={Workout} />
    </Tab.Navigator>
  );
}
