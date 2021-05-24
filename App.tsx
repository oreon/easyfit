import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { RootSiblingParent } from "react-native-root-siblings";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const TASK_NAME = "BACKGROUND_TASK";

TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + Math.random();
    console.log("My task ", receivedNewData);

    //TODO: show a local notification  reminder here if its time for workout/ meditation / meals/ walk
    //etc
    return receivedNewData
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (err) {
    return BackgroundFetch.Result.Failed;
  }
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const registerTask = async () => {
      try {
        console.log("app launched");
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 5, // seconds,
        });
        console.log("Task registered");
      } catch (err) {
        console.log("Task Register failed:", err);
      }
    };

    registerTask();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </RootSiblingParent>
    );
  }
}
