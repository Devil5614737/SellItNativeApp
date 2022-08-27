import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Account from "./screens/Account";
import Main from "./screens/Main";
import UploadItem from "./screens/UploadItem";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";
import authStorage from "./storage/auth";
import jwtDecode from "jwt-decode";
import AppLoading from "expo-app-loading";
import { PostContextProvider } from "./context/PostContext";
import AnimationScreen from "./screens/AnimationScreen";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();
  const Stack = createNativeStackNavigator();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreToken}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" animated />
      <AuthContext.Provider value={{ user, setUser }}>
        <PostContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          >
            {user ? 
              <Stack.Screen name="Main" component={Main} />
             : 
              <Stack.Screen name="Login" component={Login} />
            }
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Upload" component={UploadItem} />
            <Stack.Screen name="Animation" component={AnimationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </PostContextProvider>
      </AuthContext.Provider>
    </>
  );
}
