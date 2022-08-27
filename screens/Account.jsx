import { Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../helpers/colors';
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { FontAwesome5 } from '@expo/vector-icons';import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import authStorage from '../storage/auth';

// TODO: fix repetition

export default function Account({navigation}) {
    const {user,setUser}=useContext(AuthContext)


    let [fontsLoaded, error] = useFonts({
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });



const handleLogout=()=>{
setUser(null);
authStorage.removeToken()
}


      if(!fontsLoaded){
        return <AppLoading/>
      }else{

          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.topBar}>
                <Text style={styles.logo}>Sellit</Text>
                <Image source={{uri:user&&user.pic}} resizeMode='cover' style={styles.avatar}/>
              </View>
              <View style={styles.listContainer}>
                <View style={styles.list}>
                    <Image source={{uri:user&&user.pic}} style={styles.avatar}/>
                    <View style={styles.info}>
                        <Text style={styles.username}>{user&&user.fullname}</Text>
                        <Text style={styles.email}>{user&&user.email}</Text>
                    </View>
                </View>
              </View>
              <View style={styles.lists}>
              <View style={styles.list}>
              <FontAwesome5 name="list-alt" size={28} color="white" />
                    <View style={styles.info}>
                        <Text style={styles.username}>My Items</Text>
                    </View>
                    <MaterialIcons name="arrow-right" size={24} color="white"  style={{position:"absolute",
                right:22}}/>
                </View>
              <View style={styles.list}>
              <MaterialCommunityIcons name="message-text-outline" size={28} color="white" />
                    <View style={styles.info}>
                        <Text style={styles.username}>My Messages</Text>
                    </View>
                    <MaterialIcons name="arrow-right" size={24} color="white"  style={{position:"absolute",
                right:22}}/>
                </View>
              <TouchableOpacity style={styles.list} onPress={handleLogout}>
              <MaterialIcons name="logout" size={28} color="white" />
                    <TouchableHighlight onPress={()=>navigation.navigate("Login")} style={styles.info}>
                        <Text style={styles.username}>Logout</Text>
                    </TouchableHighlight>
                    <MaterialIcons name="arrow-right" size={24} color="white"  style={{position:"absolute",
                right:22}}/>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )
      }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.dark
    },
    topBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding:22
    }
    ,
    logo:{
        color: colors.green,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 25,
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    listContainer:{
marginTop:22
    },
    list:{
        padding:22,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:colors.listBg,
        position: 'relative',
        marginBottom:12
    },
    info:{
        marginLeft:15
    },
    username:{
color:'white',
fontFamily:"Poppins_600SemiBold",
fontSize:16
    },
    email:{
fontFamily:"Poppins_500Medium",
color:colors.darkGrey
    },
    lists:{
        marginTop:32,
        marginBottom:15
    }
})