import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

export const storeData = async (key:string, val:string) => {
  try {
    await AsyncStorage.setItem(key, val)
    let toast = Toast.show("Saved !", {
      duration: Toast.durations.SHORT,
    });
  } catch (e) {
    // console.error("couldnt save for ", cur_date_str, slp);
    let toast = Toast.show("Error saving  " + key  + " -> " + e, {
      duration: Toast.durations.SHORT,
    });
  }
}

export const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
    }
    return value
  } catch(e) {
    // error reading value
    return null
  }
}