import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../helpers/colors";
import AppLoading from "expo-app-loading";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Post } from "../api/post";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export default function UploadItem({navigation}) {
  const {setUploaded}=useContext(PostContext)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  let [fontsLoaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const getLocation = async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsLoading(false);
      setErrorMsg("Permission to access location was denied");
      alert(errorMsg);
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setIsLoading(false);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    if (title && desc && price && image && longitude && latitude) {
      const result = await Post(title, desc, price, image, longitude, latitude);
      if(result.status===200){
        navigation.navigate('Animation');
        setUploaded(true)
      }
    } else {
      alert("something went wrong");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageContainer}>
            {image && (
              <Image
                style={styles.image}
                source={{ uri: image }}
                resizeMode="cover"
              />
            )}

            <TouchableOpacity onPress={pickImage} style={styles.box}>
              <Entypo name="camera" size={28} color="#545454" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            placeholderTextColor="#777777"
            onChangeText={(text) => setTitle(text)}
            value={title}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#777777"
            onChangeText={(text) => setDesc(text)}
            value={desc}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            placeholderTextColor="#777777"
            onChangeText={(text) => setPrice(text)}
            value={price}
          />
          <TouchableHighlight onPress={getLocation} style={styles.locationBtn}>
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.locationButtonText}>
                <Ionicons name="location" size={24} color="white" />
                Location
              </Text>
            )}
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={upload}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 22,
    paddingTop: 52,
    paddingBottom: 0,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  box: {
    backgroundColor: "#212121",
    width: 100,
    height: 100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  input: {
    backgroundColor: "#212121",
    width: "100%",
    height: 60,
    marginBottom: 22,
    borderRadius: 6,
    paddingLeft: 12,
    fontFamily: "Poppins_500Medium",
    color:'white'
  },
  locationBtn: {
    backgroundColor: colors.dark,
    width: "100%",
    height: 60,
    marginBottom: 22,
    borderRadius: 6,
    paddingLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  button: {
    backgroundColor: colors.green,
    width: "100%",
    height: 60,
    marginBottom: 22,
    borderRadius: 6,
    paddingLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
  },
  locationButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
  },
});
