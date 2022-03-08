import React from "react";
import { View, Text, Button } from "react-native";
import { Audio } from "expo-av";
//TODO remove this from project
//import TrackPlayer from "react-native-track-player";

export default function TrackPlayer() {
  const [sound, setSound] = React.useState();

  async function playSound(filename: string) {
    console.log("Loading Sound ", filename);
    //const file = ;
    //console.log(file);
    //TODO improve this shitty code - the replay / pause funcitonality is broken
    if (filename === "pre-meals") {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/pre-meals.mp3")
      );
      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/3_min_breathing.mp3")
      );
      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync();
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Pre meals" onPress={() => playSound("pre-meals")} />

      <Button title="Breath" onPress={() => playSound("3_min_breathing")} />
    </View>
  );
}

// export default function TrackPlayer() {
//   return (
//     <Surface style={{ flex: 1 }}>
//       <SoundPlayer title="Breath" name="3_min_breathing" />
//       <SoundPlayer title="Before meals" name="pre-meals" />
//     </Surface>
//   );
