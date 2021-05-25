import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimePicker(props: any) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate.getHours() + ":" + currentDate.getMinutes());
  };

  return (
    <View>
      <Button onPress={() => setShow(true)}> {props.label} </Button>
      <Text>{date.getHours() + ":" + date.getMinutes()}</Text>
      {show && (
        <DateTimePicker
          testID={props.name}
          value={date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
