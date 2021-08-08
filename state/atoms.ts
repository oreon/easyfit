import { atom , selectorFamily} from 'recoil';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultValue } from "recoil";

const asyncStorageEffect = key => ({setSelf, onSet}) => {
  setSelf(AsyncStorage.getItem(key).then(savedValue =>
    savedValue != null
      ? JSON.parse(savedValue)
      : new DefaultValue() // Abort initialization if no value was stored
  ));

  onSet(async newValue =>  {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const times = atom({
    key: 'times',
    //default:async (param) => defaultAsyncValue(param, "title", recipeData.title),
    default: {
      feedStart: "9:30",
      feedEnd: "4:20",
      Meditation: "13:00",
    },
    effects_UNSTABLE: [asyncStorageEffect('times')],
});



const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,

});



export const localStorageEffect = (key) => async ({ setSelf, onSet }) => {
  const savedValue = await AsyncStorage.getItem(key);

  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet(async (newValue) => {
    if (newValue instanceof DefaultValue) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};



export const defaultAsyncValue = async ( type, defaultValue) => {
  const savedValue = await AsyncStorage.getItem(`settings_${type}`);
  if (savedValue != null) {
    return JSON.parse(savedValue);
  } else {
    return defaultValue;
  }
};




// export const timesFieldState = selectorFamily({
//     key: 'FormField',
//     get: field => ({get}) => get(times)[field],
//     set: field => ({set}, newValue) =>
//       set(times, prevState => {...prevState, [field]: newValue}),
//   });



// export const isLoggedIn = atom({
//     key: 'isLoggedIn',
//     default: false,
// })