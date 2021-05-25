import { Provider, TextInput } from "react-native-paper";

import React, { useState } from "react";

import { SafeAreaView, StyleSheet } from "react-native";

import DropDown from "react-native-paper-dropdown";

export default function WeekdayPicker(props: any) {
  const [showDropDown, setShowDropDown] = useState(false);

  const [dayofweek, setdayofweek] = useState();

  const dayofweekList = [
    { label: "Sunday", value: "sun" },

    { label: "Monday", value: "mon" },

    { label: "Tuesday", value: "tue" },
    { label: "Wendsday", value: "wed" },

    { label: "Thursday", value: "thu" },

    { label: "Friday", value: "fri" },
    { label: "Saturday", value: "sat" },
  ];

  return (
    <DropDown
      label={props.label}
      mode={"outlined"}
      value={dayofweek}
      setValue={setdayofweek}
      list={dayofweekList}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      inputProps={{
        right: <TextInput.Icon name={"menu-down"} />,
      }}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,

    marginHorizontal: 20,

    justifyContent: "center",
  },
});
