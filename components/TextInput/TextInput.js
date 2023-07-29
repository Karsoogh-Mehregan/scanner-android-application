import { TextInput, StyleSheet } from "react-native";

export default function CustomTextInput(props) {
    return (
        <TextInput style={[styles.TextInputStyle, {"fontFamily":props.font}]} {...props}  />
    )
}

const styles = StyleSheet.create({
    TextInputStyle: {
        borderColor: "#B2B2B2",
        borderWidth: 2,
        padding: 10,
        borderRadius: 14,
        width: "100%",
        fontSize: 15,
    },
})