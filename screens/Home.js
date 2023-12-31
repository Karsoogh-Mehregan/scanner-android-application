import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import CustomButton from "../components/Button/CustomButton";
import SelectDropdown from "react-native-select-dropdown";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const customFonts = {
  "Vazir-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
  "Vazir-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
};

export default function Home({ navigation }) {
  const [showSelectLocation, setShowLocation] = useState(false);
  const [isLoaded] = useFonts(customFonts);
  const [_, setUsername] = useState("heb");
  const [actions, setActions] = useState([]);
  const [isLatestVersion, setIsLatestVersion] = useState(true);
  const [name, setName] = useState("")

  useEffect(() => {
    axios.post("https://karsoogh.at1d.ir/actions/get", {}).then((res) => {
      const titlesArray = res.data.actions.map((action) => action.title);
      setActions(titlesArray);
    });
  }, []);

  useEffect(() => {
    async function fetchStorageData() {
      const gottenUsername = await AsyncStorage.getItem("username");
      const gottenName = await AsyncStorage.getItem("name");
      if (gottenUsername) {
        setUsername(gottenUsername);
        setName(gottenName)
      }
    }
    fetchStorageData();
  }, []);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("https://karsoogh.at1d.ir/version/get");
      setIsLatestVersion(response.data.title === Constants.expoConfig.version);
    }
    getData();
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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainSelectTask}>
          {isLatestVersion ? (
            <Text style={styles.WelcomeText}>
              سلام {name} عزیز :)
            </Text>
          ) : (
            <Text style={[styles.WelcomeText, {"textDecorationLine":"underline"}]}>
              لطفا برنامه را آپدیت کنید
            </Text>
          )}
          <View style={styles.goButton}>
            <CustomButton
              color={isLatestVersion ? "#85BC22" : "gray"}
              radius={10}
              font="Vazir-Bold"
              onPress={
                isLatestVersion
                  ? () => {
                      navigation.push("Footstep", { query: "submit_score" });
                      setShowLocation(false);
                    }
                  : () => {}
              }
            >
              ثبت امتیاز
            </CustomButton>
          </View>
          <View style={styles.goButton}>
            <CustomButton
              color={isLatestVersion ? "#456112" : "gray"}
              radius={10}
              font="Vazir-Bold"
              onPress={
                isLatestVersion
                  ? () => {
                      setShowLocation(true);
                    }
                  : () => {}
              }
            >
              تغییر محل حضور
            </CustomButton>
          </View>
          {showSelectLocation && (
            <View style={[{ justifyContent: "center" }]}>
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
                  navigation.push("Footstep", {
                    selectedItemData: selectedItem,
                    query: "change_action",
                  });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          )}
          <View style={styles.goButton}>
            <CustomButton
              color={isLatestVersion ? "#31450C" : "gray"}
              radius={10}
              font="Vazir-Bold"
              onPress={
                isLatestVersion
                  ? () => {
                      navigation.navigate("Footstep", { query: "reception" });
                      setShowLocation(false);
                    }
                  : () => {}
              }
            >
              پذیرش دانش‌آموز
            </CustomButton>
          </View>
        </View>
        <View style={styles.BottomContainer}>
          <CustomButton 
              color="#852E30"
              radius={10}
              font="Vazir-Bold"
              style={{"marginBottom":20}}
              onPress={logoutHandler}
              >خروج از حساب</CustomButton>
      
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
    flex: 0.6,
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
  },
  BottomContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    width:"70%"
  },
});
