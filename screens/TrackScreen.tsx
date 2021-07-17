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
  const [slp, setSlpstate] = useState({});

  useEffect(() => {
    async function fetchMyAPI() {
      const rdata = await getData(cur_date_str);
      const data = JSON.parse(rdata);
      console.log("read tracked data ", data);
      //data["sleep"] = setSlpstate(data);
      setSlpstate(data);
    }

    fetchMyAPI();
  }, []);

  //Save the  values to local storage
  const save = async () => {
    try {
      console.log("writing ", cur_date_str, slp);
      await AsyncStorage.setItem(cur_date_str, JSON.stringify(slp));
      //setSlpstate(value);
      let toast = Toast.show("Successfully saved", {
        duration: Toast.durations.SHORT,
      });
    } catch (e) {
      console.error("couldnt save for ", cur_date_str, slp);
      let toast = Toast.show("Error saving state " + e, {
        duration: Toast.durations.SHORT,
      });
    }
  };

  const updateSliderVal = async (value: number, slider: string) => {
    slp[value] = slider;
    console.log(slp);
  };

  //TODO: read the values on startup

  return (
    <View style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{slp ? slp["sleep"] : 0}</Text>
      <CustomSlider
        name="sleep"
        label="Sleep"
        initValue={slp["sleep"]}
        callback={updateSliderVal}
      />
      <CustomSlider
        name="stress"
        label="Stress"
        initValue={slp ? slp["stress"] : 5}
        callback={updateSliderVal}
      />
      <Button onPress={() => save()}>Save </Button>
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
