import {AsyncStorage} from '@react-native-async-storage/async-storage';

export default retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== undefined) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
