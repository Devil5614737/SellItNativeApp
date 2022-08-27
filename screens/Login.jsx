import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../helpers/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { login } from "../api/auth";
import authStorage from "../storage/auth";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.data) {
        setLoading(false);
        const decoded = jwtDecode(result.data);
        setUser(decoded);
        authStorage.setToken(result.data);
      } else if (result.status !== 200) {
        alert("invalid credentials");
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

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
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.bar}></View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Input
            onChangeText={(text) => setEmail(text)}
            secureTextEntry={false}
            type="email-address"
            style={styles.input}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <Input
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            type="default"
            style={styles.input}
            value={password}
          />
          <Button style={styles.btn} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <Text style={styles.btnText}>Login</Text>
            )}
          </Button>
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={styles.bottomText}
          >
            I don't have an account
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 22,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 53,
  },
  title: {
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 33,
    marginRight: 12,
  },
  bar: {
    backgroundColor: colors.barColor,
    height: 2,
    width: 110,
  },
  inputContainer: {
    marginTop: 43,
  },
  label: {
    color: colors.lightGrey,
    fontFamily: "Poppins_600SemiBold",
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: colors.inputBg,
    borderRadius: 6,
    marginTop: 12,
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    paddingLeft: 12,
    marginBottom: 22,
  },
  btn: {
    width: "100%",
    height: 60,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginTop: 12,
  },
  btnText: {
    color: "black",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
  },
  bottomText: {
    fontFamily: "Poppins_600SemiBold",
    color: colors.darkGrey,
    textAlign: "center",
    marginTop: 44,
    fontSize: 15,
  },
});
