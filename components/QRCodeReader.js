import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Button, Image, Platform, KeyboardAvoidingView } from "react-native";
import { Camera, FlashMode } from "expo-camera";
import { Dimensions } from "react-native";
import CustomButton from "./Button/CustomButton";
import { useFonts } from 'expo-font';
import { useRoute } from "@react-navigation/native";
import CustomTextInput from "./TextInput/TextInput";
import { useHeaderHeight } from '@react-navigation/elements'


export default  function QRCodeReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userText, setUserText] = useState(null);
  const [torchon, setTorchon] = useState(false);
  const [cameraPaused, setCameraPaused] = useState(false);
  const cameraRef = useRef(null);
  const route = useRoute();
  const height = useHeaderHeight()


  const [fontsLoaded] = useFonts({
    'Vazir-Regular': require('../assets/fonts/Vazirmatn-Regular.ttf'),
    'Vazir-Bold': require('../assets/fonts/Vazirmatn-Bold.ttf'),
  });

  const scanAgainButtonClicked = () => {
    setScanned(false);
    cameraRef.current.resumePreview();
  };

  const FlashLightChangeMode = () => {
    setTorchon(prv => !prv)
  }

  const changeCameraMode = () => {
    setCameraPaused(prv => !prv)
  }

  useEffect(() => {
    if (cameraRef.current) {
      if (cameraPaused) {
        cameraRef.current.pausePreview();
      } else {
        cameraRef.current.resumePreview();
      }
  }
  }, [cameraPaused])

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    cameraRef.current.pausePreview();
    setUserText(data.split(','));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={height + 47} behavior="padding">
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          flashMode={torchon ? FlashMode.torch : FlashMode.off}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="4:3"
          style={[
            {
              width: Dimensions.get("screen").width,
              height: Math.round((Dimensions.get("screen").width * 4 ) / 3),
            },
          ]}
        >
          <View style={[styles.qrCodeImage]}>
            <Image
              source={require("./QRCodeKarsoogh.png")}
              style={[
                {
                  width: Dimensions.get("screen").width * 0.7,
                  height: Dimensions.get("screen").width * 0.7,
                },
              ]}
            />
          </View>
          <View style={styles.detailContainer}>
            <View style={[scanned ? styles.bottonDetail : {"flexDirection":"row", "gap":5}]}>
              {scanned && (
                <Text style={styles.textStyle}>
                  دوربین به حالت فریز در آمده است
                </Text>
              )}
              {scanned && (
                <CustomButton
                  onPress={scanAgainButtonClicked}
                  radius={15}
                  color="#7B27FF"
                  font="Vazir-Bold"
                >
                  اسکن مجدد
                </CustomButton>
              )}
              {!scanned && <CustomButton
                  onPress={FlashLightChangeMode}
                  radius={15}
                  color="#85BC22"
                  font="Vazir-Bold"
                >
                {torchon ? "خاموش کردن فلش" : "روشن کردن فلش"}
                </CustomButton>  
              }
              {!scanned && <CustomButton
                  onPress={changeCameraMode}
                  radius={15}
                  color="#7B27FF"
                  font="Vazir-Bold"
                >
                {cameraPaused ? "ادامه اسکن" : "توقف اسکن"}
                </CustomButton>  
              }
            </View>
          </View>
        </Camera>
      </View>
      {scanned ? (
        <View>
          <View style={styles.nameContainer}>
            <Text style={{ fontSize: 20, fontFamily: "Vazir-Regular" }}>
              نام و نام خوانوادگی:
            </Text>
            <Text style={styles.name}>{userText[0]}</Text>
          </View>
          <View style={styles.groupBtn}>
            <CustomButton radius={10} color="#7B27FF" font="Vazir-Bold">
              اعلام حضور
            </CustomButton>
            <CustomButton radius={10} color="#85BC22" font="Vazir-Bold">
              ثبت امتیاز
            </CustomButton>
          </View>
          <View style={styles.groupBtn}>
            <CustomButton radius={10} color="#8A2222" font="Vazir-Bold">
              اخطار انظباطی
            </CustomButton>
            <CustomButton radius={10} color="#85BC22" font="Vazir-Bold">
              پذیرش
            </CustomButton>
          </View>
          <View style={styles.locationContaier}>
            <Text style={styles.locationText}>{route.params.location}</Text>
          </View>
        </View>
      ):
        <View style={styles.InputManualText}>
          <CustomTextInput font="Vazir-Bold" placeholder="مثلا: عتید خدائی"></CustomTextInput>
          <View style={{"width":"100%"}}>
            <CustomButton font="Vazir-Bold" radius={10} color="#7B27FF">دنبالم بگرد!</CustomButton>
          </View>
        </View>
      }
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems:"center",
    padding: 0,
    margin: 0,
    gap: 15,
  },
  cameraContainer: {
    width: "100%",
    height: Math.round((Dimensions.get("screen").width * 4) / 3),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  detailContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "20%",
    gap: 5,
    zIndex: 999,
    elevation: Platform.OS === "android" ? 999 : 0,
    flex: 1,
  },
  textStyle: {
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    fontFamily: "Vazir-Regular",
    marginBottom: 5,
  },

  qrCodeImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },

  bottonDetail: {
    gap: 2,
  },

  nameContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },

  name: {
    padding: 5,
    paddingHorizontal: 30,
    backgroundColor: "#CFCFCF",
    borderRadius: 15,
    fontFamily: "Vazir-Bold",
    fontSize: 20,
  },

  groupBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 5,
  },

  locationContaier: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  locationText: {
    fontFamily: "Vazir-Bold",
    padding: 5,
    paddingHorizontal: 30,
    backgroundColor: "#CFCFCF",
    borderRadius: 15,
    fontSize: 20,
    textDecorationLine: "underline",
  },

  InputManualText: {
    width:"80%",
    alignItems:"center",
    gap: 5,
  }
});
