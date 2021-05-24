import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="fruit-pineapple" />
);

const HamIcon = (props: any) => <Avatar.Icon {...props} icon="hamburger" />;

export default function TodayScreen() {
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
          <Paragraph>Have a big bowl of fruits</Paragraph>
          <Paragraph>Soaked almonds or walnuts from previous night</Paragraph>
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
          <Paragraph>A big bowl of salad</Paragraph>
          <Paragraph>Oatmeal with salt and pepper</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Done</Button>
        </Card.Actions>
      </Card>
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
