import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import { getData, storeData } from "../utils/AsyncStorageHelper";

export default function CustomSlider(props: any) {
  const [slp, setSlpstate] = useState(props.initValue);
  const cur_date = () => new Date().toISOString().split("T")[0];

  // const save = (value: number) => {
  //   const cur_date = new Date();
  //   setSlpstate(value);
  //   if (props?.callback) {
  //     props.callback(props.name, value);
  //   }
  // };

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await getData(cur_date() + "_" + props.name);
      console.log("read slider val ", data);
      if (data != null) {
        const idata = parseInt(data);
        setSlpstate(idata);
      }
    }

    fetchMyAPI();
  }, []);

  const save = async (value) => {
    setSlpstate(value);
    //console.log(dayofweek);
    //setdayofweek
    await storeData(cur_date() + "_" + props.name, value + "");
  };

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
