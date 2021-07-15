import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Slider from "@react-native-community/slider";
import TodayScreen, { TodayScreenNav } from "../screens/TodayScreen";
import Workout from "../screens/Workout";
import Settings from "../screens/Settings";
import TrackPlayer from "../screens/TrackPlayer";

const Tab = createMaterialTopTabNavigator();

export function TodayNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Diet" component={TodayScreenNav} />
      <Tab.Screen name="Workout" component={Workout} />
      <Tab.Screen name="Meds" component={TrackPlayer} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
