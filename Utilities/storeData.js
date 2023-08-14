import {AsyncStorage} from '@react-native-async-storage/async-storage';

export default storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value,
      );
    } catch (error) {
      console.log(error);
    }
  };