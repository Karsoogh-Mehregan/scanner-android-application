import { useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native"
import { useFonts } from 'expo-font';
import CustomText from "../components/Text/Text";
import CustomButton from './../components/Button/CustomButton';
import CustomTextInput from "../components/TextInput/TextInput";


const customFonts = {
    'Vazir-Regular': require('../assets/fonts/Vazirmatn-Regular.ttf'),
    'Vazir-Bold': require('../assets/fonts/Vazirmatn-Bold.ttf'),
  };


export default function Login({ navigation }) {
    const [isLoaded] = useFonts(customFonts);
    const [isLoading, setIsLoading] = useState(false)
    if (!isLoaded) {
        return <ActivityIndicator size="large"/>
    }

    const goToNextPage = () => {
        navigation.navigate("Home")
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={{"fontSize":20, "fontFamily":"Vazir-Bold"}}>اول باید لاگین کنی!</Text>
                    <View style={{"gap":10, "width":"100%", "alignItems":"center"}}>
                        <View style={styles.InputGroup}>
                            <CustomText font="Vazir-Bold">نام کاربری:</CustomText>
                            <CustomTextInput font="Vazir-Regular" textContentType="username" selectionColor="gray"  placeholder="Example: At1X"></CustomTextInput>
                        </View>
                        <View style={[styles.InputGroup, {"marginTop":5}]}>
                            <CustomText font="Vazir-Bold">رمز عبور:</CustomText>
                            <CustomTextInput font="Vazir-Regular" secureTextEntry={true} textContentType="password" selectionColor="gray" placeholder="Example: A*&jQ@B"></CustomTextInput>
                        </View>
                        <View style={styles.ButtonLogin}>
                            <CustomButton onPress={goToNextPage} color="#7B27FF" radius={14} font="Vazir-Bold">{isLoading ? <ActivityIndicator color="#85BC22"/> : "برو که بریم!"}</CustomButton>
                            <CustomText style={{"marginTop":10}} font="Vazir-Regular">ساخت اکانت فعلا تو برنامه فعال نیست. اگه اکانت نداری، داخل تلگرام به blacktid@ پیام بده! :)</CustomText>
                        </View>
                    </View>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    InputGroup: {
        width: "80%",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 5,
    },
    ButtonLogin: {
        width: "80%"

    },
})