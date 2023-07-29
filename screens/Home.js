import { View, StyleSheet, ActivityIndicator } from "react-native"
import CustomButton from "../components/Button/CustomButton"
import SelectDropdown from 'react-native-select-dropdown'
import { useFonts } from 'expo-font';
import { useState } from "react";

 
const customFonts = {
    'Vazir-Regular': require('../assets/fonts/Vazirmatn-Regular.ttf'),
    'Vazir-Bold': require('../assets/fonts/Vazirmatn-Bold.ttf'),
  };

export default function Home({ navigation }) {
    const [location, setLocation] = useState(null);
    const [isLoaded] = useFonts(customFonts);
    if (!isLoaded) {
        return <ActivityIndicator size="large"/>
    }

    const countries = ["میدان امام", "استخر پسران", "خوابگاه پسران", "خوابگاه دختران" , "مدرسه اژه‌ای", "مدرسه فرزانگان"]
    return (
        <>
            <View style={styles.container}>
                <SelectDropdown
                    buttonStyle={{ backgroundColor: '#696969', borderRadius: 10, width: "70%", margin: 10 }}
                    buttonTextStyle={{ color: '#fff', fontSize: 18, fontFamily: "Vazir-Bold" }}
                    dropdownStyle={{"backgroundColor":"#4D4D4D", "borderRadius":10}}
                    rowTextStyle={{ color: '#fff', fontSize: 18, fontFamily: "Vazir-Bold"}}
                    defaultButtonText="کجا می‌روید؟"
                    data={countries}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem);
                        setLocation(selectedItem)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
                <View style={styles.goButton}>
                    <CustomButton color="#85BC22" radius={10} font="Vazir-Bold" onPress={() => navigation.navigate("Footstep", {"location":location})}>بزن بریم!</CustomButton>
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
    },
    goButton: {
        width: "70%",
    }
})