import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { MEAL_PLAN } from "./data";
import MedTrackPlayer from "./TrackPlayer";
const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="fruit-pineapple" />
);

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

const Stack = createStackNavigator();

export function TodayScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TodayScreen} />
      <Stack.Screen name="Notifications" component={MedTrackPlayer} />
    </Stack.Navigator>
  );
}

export function PlaylistScreen() {
  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default function TodayScreen() {
  const day = new Date().getDay();
  const meals = MEAL_PLAN[day];
  const breakfast = meals.breakfast ? meals.breakfast : MEAL_PLAN.breakfast;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled" // http://t.cn/EowE3r3
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        <Card.Title title="Breakfast" left={LeftContent} />
        <Card.Content>
          <Title>Around 9 am </Title>
          {breakfast.map((item: string) => (
            <Paragraph>{item}</Paragraph>
          ))}
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Done</Button>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Title title="Lunch" left={HamIcon} />
        <Card.Content>
          <Title>Between 12-2 pm </Title>
          {meals.lunch.map((item: string) => (
            <Paragraph>{item}</Paragraph>
          ))}
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Done</Button>
        </Card.Actions>
      </Card>

      {/* <Button onPress={() => navigation.push("settings")}>Settings</Button> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
