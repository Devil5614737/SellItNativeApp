import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import { colors } from '../helpers/colors';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from 'expo-app-loading';


export default function AnimationScreen({navigation}) {

  let [fontsLoaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <View style={styles.container}>
       <Lottie
        onAnimationFinish={()=>navigation.navigate('Main')}
      style={{
        width: 100,
        height:100
      }}
  autoPlay
  loop={false}
      source={require('../assets/animations/success.json')}
      />
      <Text style={{
        color:'white',
        fontSize:22,
        fontFamily:"Poppins_600SemiBold"
      }}>Posted Successfully</Text>
      </View>
    )
  }
  
  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.dark
    }
})