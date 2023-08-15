import { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./Button/CustomButton";
import ShowName from "./ShowName/ShowName";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SetScore({ data }) {
  const [buttonText, setButtonText] = useState("Nothing");
  const [error, setError] = useState();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false)

  const handleScoreSubmit = () => {
    async function sendData() {
      setButtonText("Waiting");
      if (score < 0 || score > 100) {
        setButtonText("Error");
        setError("امتیاز باید بین 0 تا 100 باشد!");
      } else {
        try {
          const username = await AsyncStorage.getItem("username");
          setLoading(true);
          const response = await axios.post(
            "https://karsoogh.at1d.ir/students/add_point",
            {
              mentor: username,
              nationalID: data.code,
              addedPoint: score,
              detail: "null",
            }
          );
          if (response.status == 200) {
            setButtonText("Done");
            setLoading(false);
          }
        } catch (error) {
          if (error) {
            if (error.response.status >= 400) {
              setButtonText("Error");
              if (error.response.data.status === "student not found") {
                setError("دانش‌آموز یافت نشد.");
              } else {
                setError("مشکلی غیرمنتظره پیش آمده است!");
              }
              setLoading(false);
            }
          }
        }
      }
    }
    sendData();
  };

  return (
    <>
      <View style={styles.SetScoreContainer}>
        <View style={{ width: "90%", gap: 10 }}>
          <ShowName userText={`${data["fullname"]}`} />
          <ShowName
            style={{ color: "#5E5E5E", textDecorationLine: "underline" }}
            userText={`امتیاز: ${score}`}
            font="Vazir-Bold"
          />
          <View style={styles.scoreControlGroup}>
            <View style={{ width: "50%" }}>
              <CustomButton
                onPress={() => {
                  setScore((prv) => (prv >= 5 ? prv - 5 : prv));
                }}
                radius={15}
                font="Vazir-Bold"
                color="#A3181A"
              >
                کاهش{" "}
              </CustomButton>
            </View>
            <View style={{ width: "50%" }}>
              <CustomButton
                onPress={() => {
                  setScore((prv) => prv + 5);
                }}
                radius={15}
                font="Vazir-Bold"
                color="green"
              >
                افزایش
              </CustomButton>
            </View>
          </View>
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
            onPress={handleScoreSubmit}
          >
            {buttonText === "Nothing"
              ? "ثبت امتیاز"
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
  SetScoreContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 20,
  },
  scoreControlGroup: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 5,
  },
});
