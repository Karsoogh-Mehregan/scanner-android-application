import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import CustomButton from "../components/Button/CustomButton";
import SelectDropdown from "react-native-select-dropdown";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Capitalize from "../Utilities/Capitalize";
import { Switch } from "react-native-gesture-handler";
import axios from "axios";
const customFonts = {
  "Vazir-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
  "Vazir-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
};

export default function Home({ navigation }) {
  const [location, setLocation] = useState(null);
  const [showSelectLocation, setShowLocation] = useState(false);
  const [isLoaded] = useFonts(customFonts);
  const [username, setUsername] = useState("heb");
  const [isEnabled, setIsEnabled] = useState(false);
  const [actions, setActions] = useState([]);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    axios.post("https://karsoogh.at1d.ir/actions/get", {}).then((res) => {
      const titlesArray = res.data.actions.map((action) => action.title);
      setActions(titlesArray);
    });
  }, []);

  useEffect(() => {
    async function fetchStorageData() {
      const gottenUsername = await AsyncStorage.getItem("username");
      if (gottenUsername) {
        setUsername(gottenUsername);
      }
    }
    fetchStorageData();
  }, []);

  if (!isLoaded) {
    return <ActivityIndicator size="large" />;
  }

  const logoutHandler = () => {
    async function logout() {
      const allkeys = await AsyncStorage.getAllKeys();
      allkeys.forEach(async (key) => {
        await AsyncStorage.removeItem(key);
      });
      if ((await AsyncStorage.getAllKeys()).length === 0) {
        navigation.replace("Login");
      }
    }
    logout();
  };

  // const countries = ["میدان امام", "استخر پسران", "خوابگاه پسران", "خوابگاه دختران" , "مدرسه اژه‌ای", "مدرسه فرزانگان"]
  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainSelectTask}>
          <Text style={styles.WelcomeText}>
            Hello {Capitalize(username)} :D
          </Text>
          <View style={styles.goButton}>
            <CustomButton
              color="#85BC22"
              radius={10}
              font="Vazir-Bold"
              onPress={() =>
                navigation.push("Footstep", { query: "submit_score" })
              }
            >
              ثبت امتیاز
            </CustomButton>
          </View>
          <View style={styles.goButton}>
            <CustomButton
              color="#456112"
              radius={10}
              font="Vazir-Bold"
              onPress={() => {
                setShowLocation(true);
              }}
            >
              تغییر محل حضور
            </CustomButton>
          </View>
          {showSelectLocation && ( <View
            style={[{ justifyContent: "center" }]}
          >
            
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: "#541BAD",
                  borderRadius: 10,
                  width: "70%",
                  margin: 10,
                }}
                buttonTextStyle={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "Vazir-Bold",
                }}
                dropdownStyle={{ backgroundColor: "#4D4D4D", borderRadius: 10 }}
                rowTextStyle={{
                  color: "#fff",
                  fontSize: 18,
                  fontFamily: "Vazir-Bold",
                }}
                defaultButtonText="برنامه چیه؟"
                data={actions}
                onSelect={(selectedItem, index) => {
                  navigation.push("Footstep", { selectedItemData: selectedItem, query: "change_action" });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
          </View>
            )}
          <View style={styles.goButton}>
            <CustomButton
              color="#31450C"
              radius={10}
              font="Vazir-Bold"
              onPress={() =>
                navigation.navigate("Footstep", { query: "reception" })
              }
            >
              پذیرش دانش‌آموز
            </CustomButton>
          </View>
          {/* <View style={styles.goButton}>
                        <CustomButton color="#911116" radius={10} font="Vazir-Bold" onPress={logoutHandler}>خروج از حساب</CustomButton>
                    </View> */}
          <View style={styles.goButton}>
            <Text style={{ fontFamily: "Vazir-Regular" }}>وارد کردن دستی</Text>
            <Switch
              trackColor={{ false: "gray", true: "gray" }}
              thumbColor={isEnabled ? "black" : "#9C9C9C"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainSelectTask: {
    flex: 0.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  goButton: {
    width: "70%",
  },
  WelcomeText: {
    fontFamily: "Vazir-Bold",
    fontSize: 20,
    // textDecorationLine: "underline",
  },
});
