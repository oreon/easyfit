import React from "react";
import { View } from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import { Audio } from "expo-av";

const state = {
  PLAYING: "playing",
  PAUSED: "paused",
  DONE: "done",
};

export default function SoundPlayer(props: any) {
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = React.useState("done");

  const _onPlaybackStatusUpdate = (status) => {
    //console.log(status);
    if (status.isLoaded) {
      if (status.isPlaying === true) setPlaying("playing");
      //this.setState({

      // playbackInstancePosition: status.positionMillis,
      // playbackInstanceDuration: status.durationMillis,
      // shouldPlay: status.shouldPlay,
      // isPlaying: status.isPlaying,
      // isBuffering: status.isBuffering,
      // rate: status.rate,
      // muted: status.isMuted,
      // volume: status.volume,
      // //loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
      // shouldCorrectPitch: status.shouldCorrectPitch
      //});
      if (status.didJustFinish && !status.isLooping) {
        setPlaying("done");
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const getIcon = () => (playing === "playing" ? "pause" : "play");

  const playPause = async (sound: any) => {
    //setPlaying(!playing);
    console.log(playing);
    switch (playing) {
      case "done":
        console.log("about to play");
        setSound(sound);
        await sound.playAsync();
        setPlaying("playing");
      case "paused":
        console.log("was  ", playing);
        const res = await sound.playAsync();
        console.log(res);
        setPlaying("playing");
        console.log("set to  ", playing);
      case "playing":
        await sound.pauseAsync();
        setPlaying("paused");
    }
    console.log(playing);
  };

  const initialStatus = {
    shouldPlay: true,
  };

  async function playSound(filename: string) {
    console.log("Loading Sound ", filename);
    //const file = ;
    //console.log(file);
    //TODO improve this shitty code
    if (filename === "pre-meals") {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/pre-meals.mp3")
        // initialStatus,
        // _onPlaybackStatusUpdate
      );
      playPause(sound);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/3_min_breathing.mp3")
        // initialStatus,
        // _onPlaybackStatusUpdate
      );
      playPause(sound);
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
    <Button onPress={() => playSound(props.name)} icon={getIcon()}>
      {props.title}
    </Button>
  );
}
