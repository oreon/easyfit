import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

export default function CustomSlider(props: any) {
  const save = (value: number) => {
    const cur_date = new Date();
    setSlpstate(value);
    if (props?.callback) {
      props.callback(props.name, value);
    }
  };

  const [slp, setSlpstate] = useState(props.initValue);

  //TODO: extract style to props
  return (
    <View style={{ alignSelf: "stretch", alignItems: "center" }}>
      <Text>
        {props.label}: {slp}
      </Text>
      <Slider
        onSlidingComplete={(val) => save(val)}
        style={{ width: "80%", height: 40 }}
        step={1}
        value={slp}
        minimumValue={1}
        maximumValue={10}
      />
    </View>
  );
}
