import QRCodeReader from "../components/QRCodeReader";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Footstep({ route }) {
    return (
            <QRCodeReader action={route.params.query} selectedItemData={route.params.selectedItemData} />
    );
}
