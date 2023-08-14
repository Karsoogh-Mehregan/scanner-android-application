import { View, StyleSheet } from "react-native";
import { useState } from "react";
import CustomButton from "./Button/CustomButton";
import ShowName from "./ShowName/ShowName";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ActionSet({ data, selectedItemData }) {
  const [buttonText, setButtonText] = useState("Nothing");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const setActionHandler = () => {
    async function sendData() {
      setLoading(true);
      setButtonText("Waiting");
      const username = await AsyncStorage.getItem("username");
      try {
        const response = await axios.post("https://karsoogh.at1d.ir/actions/add", {
          mentor: username,
          nationalID: data.code,
          action: selectedItemData,
        });
        if (
          response.status == 200 &&
          response.data.status === "action added to this student"
        ) {
          setButtonText("Done");
          setLoading(false);
        }
      } catch (error) {
        if (error.response.status >= 400) {
          setButtonText("Error");
          if (error.response.data.status === "Student not found") {
            setError("دانش آموز یافت نشد!");
          } else if (error.response.data.status === "Action not found") {
            setError("این ارور هیچوقت رخ نمی‌ده. اکشن مورد نظرت پیدا نشده.");
          } else if (
            error.response.data.status ===
            "This action added previously to this student"
          ) {
            setError("هشدار! این کاربر قبلا ثبت شده است");
          }
          else {
            setError(`مشکلی غیرمنتظره پیش آمده است! ${error.response}`);
          }
            setLoading(false);
        }
      }
    }
    sendData();
  };

  return (
    <>
      <View style={styles.ReceptionContainer}>
        <View style={{ width: "90%", gap: 10 }}>
          <ShowName userText={`${data["fullname"]}`} />
          <ShowName userText={`${selectedItemData}`} />
          <CustomButton
            color={
              buttonText === "Nothing"
                ? "#7B27FF"
                : buttonText === "Done"
                ? "#85BC22"
                : buttonText === "Error"
                ? "red"
                : "#FFC107"
            }
            radius={10}
            font="Vazir-Bold"
            onPress={setActionHandler}
          >
            {buttonText === "Nothing"
              ? "ثبت کنید!"
              : buttonText === "Done"
              ? "ثبت شد"
              : buttonText === "Error"
              ? error
              : "منتظر بمانید"}
          </CustomButton>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ReceptionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 20,
  },
});
