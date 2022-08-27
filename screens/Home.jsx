import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  RefreshControl
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../helpers/colors";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { PostContext } from "../context/PostContext";
import { useEffect } from "react";
import { SuccessAnimation } from "../components/SuccessAnimation";



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


export default function Home({ navigation }) {
  const{data,fetchItems}=useContext(PostContext);
  const [modalVisible, setModalVisible] = useState(false);
  const[refreshing,setRefreshing]=useState(false);

  
 





  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() =>{
      fetchItems()
      setRefreshing(false)});
  }, []);


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
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.topBar}>
            <Text style={styles.logo}>Sellit</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Account")}
            >
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1604077350837-c7f82f28653f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                }}
                resizeMode="cover"
                style={styles.userImg}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
           refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
            style={styles.cardContainer}
            showsVerticalScrollIndicator={false}
            
          >
            {data.map(post=>
            <Card setModalVisible={setModalVisible} image={post.image} price={post.price} title={post.title} post={post}/>
              )}
       
          </ScrollView>
        <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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

    
    paddingBottom:0
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: colors.green,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardContainer: {
    marginTop: 32,
  },
});
