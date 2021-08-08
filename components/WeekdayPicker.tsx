import React, { useState, useEffect } from "react";

import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import DropDown from "react-native-paper-dropdown";
import { getData, storeData } from "../utils/AsyncStorageHelper";

import SmoothPicker from "react-native-smooth-picker";

const dayofweekList = [
  { label: "Sunday", value: "sun" },

  { label: "Monday", value: "mon" },

  { label: "Tuesday", value: "tue" },
  { label: "Wendsday", value: "wed" },

  { label: "Thursday", value: "thu" },

  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "sat" },
];

const wkdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wendsday",
  "Thursday",
  "Friday",
  "Saturday",
];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 20,
  1: 15,
  2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[
        styles.OptionWrapper,
        {
          opacity,
          borderColor: selected ? "#ABC9AF" : "transparent",
          width: vertical ? 190 : "auto",
        },
      ]}
    >
      <Text style={{ fontSize }}>{name}</Text>
    </View>
  );
});

const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return (
    <Item
      opacity={opacity}
      selected={selected}
      vertical={vertical}
      fontSize={fontSize}
      name={item}
    />
  );
};

export default function WeekdayPicker(props: any) {
  const [dayofweek, setdayofweek] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await getData("settings_" + props.name);
      console.log("read tracked weekday ", data);
      const idata = parseInt(data);
      if (data != null) setdayofweek(idata);
    }

    fetchMyAPI();
  }, []);

  const handleChange = async (index) => {
    setdayofweek(index);
    //console.log(dayofweek);
    //setdayofweek
    await storeData("settings_" + props.name, index + "");
  };
  //data={Array.from({ length: 16 }, (_, i) => i)}
  return (
    <SmoothPicker
      initialScrollToIndex={dayofweek}
      onScrollToIndexFailed={() => {}}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      data={wkdays}
      scrollAnimation
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onSelected={({ item, index }) => handleChange(index)}
      renderItem={(option) => ItemToRender(option, dayofweek, true)}
      magnet
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  wrapperHorizontal: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
  },
  wrapperVertical: {
    width: 250,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    color: "black",
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
  },
});

// export function WeekdayPick(props: any) {
//   const [showDropDown, setShowDropDown] = useState(false);

//   const [dayofweek, setdayofweek] = useState();

//   useEffect(() => {
//     async function fetchMyAPI() {
//       const data = await getData("settings_" + props.name);
//       console.log("read tracked weekday ", data);
//       if (data != null) setdayofweek(data);
//     }

//     fetchMyAPI();
//   }, []);

//   const save = async () => {
//     setShowDropDown(false);
//     console.log(dayofweek);
//     //setdayofweek
//     await storeData("settings_" + props.name, dayofweek);
//   };

//   return (
//     <DropDown
//       label={props.label}
//       mode={"outlined"}
//       value={dayofweek}
//       setValue={setdayofweek}
//       list={dayofweekList}
//       visible={showDropDown}
//       showDropDown={() => setShowDropDown(true)}
//       onDismiss={save}
//       inputProps={{
//         right: <TextInput.Icon name={"menu-down"} />,
//       }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,

//     marginHorizontal: 20,

//     justifyContent: "center",
//   },
// });
