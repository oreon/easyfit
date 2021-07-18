import * as React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StatsScreen from "./StatsScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import CustomSlider from "../components/CustomSlider";
import { getData, storeData } from "../utils/AsyncStorageHelper";

const Tab = createMaterialTopTabNavigator();
const cur_date_str = new Date().toISOString().split("T")[0];

export function TackTopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Charts" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function TrackScreen() {
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <CustomSlider name="sleep" label="Sleep" />
      <CustomSlider name="stress" label="Stress" />
      {/* <Button onPress={() => save()}>Save </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
