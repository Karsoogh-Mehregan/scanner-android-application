import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import CustomButton from "./Button/CustomButton";
import ShowName from "./ShowName/ShowName";
import axios from "axios";

const customFonts = {
  "Vazir-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
  "Vazir-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
};

export default function Reception({ data }) {
  const [isLoaded, setIsLoaded] = useState(customFonts);
  const [buttonText, setButtonText] = useState("Nothing");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (loading) setButtonText("Waiting");
  }, [loading]);

  const registerStudent = async () => {
    let response = null;
    setLoading(true);
    try {
      if (Object.keys(data).length == 2) {
        response = await axios.post(
          "https://karsoogh.at1d.ir/students/add",
          {
            teamName: ("Staff-Team-" + data.id).toString(),
            fullName: data.fullname,
            nationalID: (1000 + data.id).toString(),
            phone: "9900784322",
            gender: "null",
          }
        );
      }
      else if (Object.keys(data).length == 4) {
        response = await axios.post(
          "https://karsoogh.at1d.ir/students/add",
          {
            teamName: data.team,
            fullName: data.fullname,
            nationalID: data.code,
            phone: data.phone,
            gender: "null",
          }
        );
      }
      
      if (
        response.status == 200 &&
        response.data.status === "student added succusfully"
      ) {
        setGroup(response.data.group)
        setButtonText("Done");
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status >= 400) {
        setButtonText("Error");
        if (error.response.data.status === "The team is complete.") {
          setError("تیم پر شده است!");
        } else if (error.response.data.status === "Repeated student") {
          setError(`${data.fullname} قبلا ثبت شده است!`);
        }
        else {
            setError("مشکلی غیرمنتظره پیش آمده است!");
        }
        setLoading(false);
      }
    }
  };
  return (
    <>
      <View style={styles.ReceptionContainer}>
        <View style={{ width: "90%", gap: 10 }}>
          <ShowName userText={`${data["fullname"]}`} />
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
            onPress={registerStudent}
          >
            {buttonText === "Nothing"
              ? "ثبت پذیرش"
              : buttonText === "Done"
              ? "ثبت شد" + "، " + group
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
