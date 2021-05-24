import * as React from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import StatsScreen from "./StatsScreen";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import CustomSlider from "../components/CustomSlider";

const Tab = createMaterialTopTabNavigator();

export function TackTopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Charts" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function TrackScreen() {
  //Save the slider values to local storate
  const save = async (value: number, slider: string) => {
    const cur_date = new Date();

    const cur_date_str = cur_date.toISOString().split("T")[0];
    try {
      console.log("writing ", cur_date_str, slider, value);
      await AsyncStorage.setItem(cur_date_str, value.toString());
      setSlpstate(value);
      let toast = Toast.show("Request failed to send.", {
        duration: Toast.durations.SHORT,
      });
    } catch (e) {
      console.error("couldnt save for ", cur_date, slider);
      // saving error
      //TODO show a toast using this library Cross-platform: react-native-root-toast
    }
  };

  //TODO: make slider a global component
  const [slp, setSlpstate] = useState(3);
  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <CustomSlider name="sleep" label="Sleep" initValue={4} callback={save} />

      <CustomSlider
        name="stress"
        label="Stress"
        initValue={3}
        callback={save}
      />

      <CustomSlider name="steps" label="Steps" initValue={3} callback={save} />
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
