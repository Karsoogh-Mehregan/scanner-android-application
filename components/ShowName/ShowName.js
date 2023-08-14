import { View, Text, StyleSheet } from "react-native";

export default function ShowName({ userText, style }) {
    return (
        <>
            <Text style={{...styles.name, ...style}}>{userText}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    name: {
        padding: 5,
        paddingHorizontal: 30,
        backgroundColor: "#CFCFCF",
        borderRadius: 15,
        fontFamily: "Vazir-Bold",
        fontSize: 20,
        textAlign: "center",
      },
})