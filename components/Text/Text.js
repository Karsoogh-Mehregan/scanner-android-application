import { View, Text } from "react-native";


export default function CustomText({ font, style, children }) {
    return (
        <View>
            <Text style={{fontFamily: font, ...style}}>{children}</Text>
        </View>
    )
}