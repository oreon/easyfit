import * as React from "react";
import { ScrollView, StyleSheet, Platform, Text } from "react-native";

import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import YoutubePlayer from "react-native-youtube-iframe";

import { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { WORKOUT_URLS } from "./data";

//icon - human

export default function Workout() {
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
