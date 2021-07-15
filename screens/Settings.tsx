import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TimePicker from "../components/TimePicker";
import WeekdayPicker from "../components/WeekdayPicker";

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
    <View style={styles.container}>
      <TimePicker label="Workout time" name="wotime"></TimePicker>
      <TimePicker label="Meditation time" name="medtime"></TimePicker>
      <WeekdayPicker label="Which day you want to fast" name="fastday" />
      <Button
        mode="contained"
        onPress={() => submit(null)}
        // disabled={!formState.isValid}
      >
        Submit
      </Button>
    </View>
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
