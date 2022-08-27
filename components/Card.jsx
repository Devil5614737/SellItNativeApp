import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { colors } from "../helpers/colors";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";


export const Card = ({post, setModalVisible ,title,price,image}) => {
const{setSpecificProduct}=useContext(PostContext);
  let [fontsLoaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.card}>
        <TouchableWithoutFeedback onPress={() => {setModalVisible(true)
        setSpecificProduct(post)}}>
          <Image
            source={{
              uri:image,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 350,
    backgroundColor: colors.inputBg,
    borderRadius: 17,
    marginBottom: 33,
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    color: 'white',
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  price: {
    color: colors.green,
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
  },
});




