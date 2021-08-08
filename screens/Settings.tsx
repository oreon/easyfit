import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TimePicker from "../components/TimePicker";
import WeekdayPicker from "../components/WeekdayPicker";

import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";

export default function Settings() {
  //   const { control, errors, formState, handleSubmit } = useForm<FormData>({
  //     mode: "onChange",
  //   });

  const submit = async (data: any) => {
    //TODO: settings are not getting saved
    console.log("saving settings  ", data);
    await AsyncStorage.mergeItem("settings", data);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <Card.Title title="Feeding window" />
        <Card.Content>
          <Text>
            We recommed a 6 - 8 hour feeding window and rest of the time you
            should be only having water / black tea/coffee (without sugar)
          </Text>

          <TimePicker label="Time for first meal" name="feedStart"></TimePicker>
          <TimePicker label="Time for last meal" name="feedEnd"></TimePicker>
        </Card.Content>
      </Card>

      <Card>
        <Card.Title title="Feeding window" />
        <Card.Content>
          <Text>Which day you want to fast?</Text>

          <WeekdayPicker
            label="On which day you want to water fast"
            name="fastday"
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", marginHorizontal: 30 },
  input: { marginVertical: 5 },

  row: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
});
