import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getData, storeData } from "../utils/AsyncStorageHelper";
import { times } from "../state/atoms";
import { useRecoilState } from "recoil";

export default function TimePicker(props: any) {
  const [val, setVal] = useRecoilState(times);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));

  useEffect(() => {
    async function fetchMyAPI() {
      const rdata = await getData("settings_" + props.name);
      const data = JSON.parse(rdata);
      console.log("read tracked data ", data);
      setDate(new Date(data));
    }

    fetchMyAPI();
  }, []);

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    await storeData("settings_" + props.name, JSON.stringify(currentDate));
    console.log(currentDate.getHours() + ":" + currentDate.getMinutes());
    //setFeedStart(currentDate.getHours() + ":" + currentDate.getMinutes());
    // const newVal = {
    //   ...val,
    // };
    // newVal[props["name"]] =
    //   currentDate.getHours() + ":" + currentDate.getMinutes();

    // console.log(val, newVal);
    // setVal(newVal);
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
