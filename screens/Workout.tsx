import * as React from "react";
import { ScrollView, StyleSheet, Platform, Text, Image } from "react-native";

import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";
import Constants from "expo-constants";

import { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Animated } from "react-native";
import { WebView } from "react-native-webview";
import { WORKOUT_URLS } from "./data";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
//import { Text, View, StyleSheet,  } from "react-native";

//icon - human

// const legs = [
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/da7a55d3-bd1a-4a1a-b174-93726056e4a0.gif",
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/29884665-6613-4557-923c-0c02e1658747.gif",
//   "https://easyslimandfit.com/media/django-summernote/2021-07-18/d0d46999-7d9a-4e19-92dd-4423d8872a94.gif",
// ];

const legs = ["squat", "lunge", "side-lunge", "glute_bridge"];

export default function Workout() {
  const [isPlaying, setIsPlaying] = React.useState(true);

  const [current, setCurrent] = React.useState(1);

  const avatarImage = () => {
    switch (current) {
      case 1:
        return require("../assets/images/legs/squat.gif");
      case 2:
        return require("../assets/images/legs/lunge.gif");
      case 3:
        return require("../assets/images/legs/side-lunge.gif");
      default:
        return require("../assets/images/legs/glute_bridge.gif");
    }
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={10}
        size={120}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2],
        ]}
        onComplete={() => {
          setCurrent(current + 1);
          return [true];
        }}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor, fontSize: 30 }}>
            {remainingTime}
          </Animated.Text>
        )}
      </CountdownCircleTimer>
      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={() => setIsPlaying((prev) => !prev)}
      />
      <Image source={avatarImage()} style={styles.logo} />

      <Text>{current}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  logo: {
    width: "90%",
    height: "90%",
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
});

export function WorkoutYoutube() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  var time = new Date().getDate();

  let playback_id = time % 2 != 0 ? WORKOUT_URLS.odd : WORKOUT_URLS.even;

  return (
    // <ScrollView>
    //   <Card>
    //     <Card.Title title="Your Workout !" />
    //     <Card.Content>
    //       <Title>Best to do on empty stomach ! </Title>
    //       {/* <Paragraph>Remember to pay attention to your breath !</Paragraph> */}
    //       <WebView
    //         style={{ flex: 1 }}
    //         javaScriptEnabled={true}
    //         source={{ uri: "https://reactnative.dev/" }}
    //       />
    //     </Card.Content>

    //     <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />

    //     <Card.Actions>
    //       <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    //     </Card.Actions>
    //   </Card>
    // </ScrollView>

    <WebView
      javaScriptEnabled={true}
      scrollEnabled={false}
      allowsFullscreenVideo={true}
      userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 
 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
      source={{
        uri: `https://www.youtube.com/embed/${playback_id}?&autoplay=0a&mute=1&showinfo=0&controls=1&fullscreen=1`,
      }}
    />
  );
}
