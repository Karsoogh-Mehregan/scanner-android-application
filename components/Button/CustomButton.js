import { View, Text, Pressable, StyleSheet } from "react-native";

export default function CustomButton({ children, color, onPress, radius, font, style }) {
    const callMe = () => {
        console.log("CALLED ME");
    }
  return (
      <View style={[styles.buttonView, {"borderRadius":radius}]}>
        <Pressable onPress={onPress} style={{...styles.button, "backgroundColor":color, "borderRadius":radius, ...style}} android_ripple={{"color":"#545454", "borderless":true}}>
            <Text style={[styles.textColor, {"fontFamily":font}]}>{children}</Text>
        </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 40,
    padding: 10,
    width: "100%"
},

buttonView: {
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
  },

  textColor: {
    color: "white",
    marginHorizontal: 10,
  },
});
