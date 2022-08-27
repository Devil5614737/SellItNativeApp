import { StyleSheet, Text, ActivityIndicator, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../helpers/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { signup } from '../api/auth';


export default function Signup({navigation}) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState(false)
    let [fontsLoaded, error] = useFonts({
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });

const handleSignup=async()=>{
  setLoading(true)
  try{
    const result=await signup(fullname,email,password);
    
    if(result.status===200){
      setLoading(false)
      alert('user created');
      navigation.navigate('Login')
    }else if(result.status!==200){
      alert("something went wrong try again sometime");
      setLoading(false);
    }
  }catch(e){
    setLoading(false)
    alert('something went wrong')
  }
}


if(!fontsLoaded){
    return <AppLoading/>
}else{

    return (
      <SafeAreaView  style={styles.container}>
       <View style={styles.titleContainer}>
          <Text style={styles.title}>Signup</Text>
          <View style={styles.bar}></View>
       </View>
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <Input value={fullname} onChangeText={(text)=>setFullname(text)} secureTextEntry={false} type='default' style={styles.input}/>
        <Text style={styles.label}>Email</Text>
        <Input value={email} onChangeText={(text)=>setEmail(text)} secureTextEntry={false} type='email-address' style={styles.input}/>
        <Text style={styles.label}>Password</Text>
        <Input value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry type='default' style={styles.input}/>
        <Button style={styles.btn} onPress={handleSignup}>
          {loading?  <ActivityIndicator size="large" color='black'/>:
            <Text style={styles.btnText}>Signup</Text>
          }
        </Button>
       </View>
      </SafeAreaView>
    )
}

}

const styles = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:colors.dark,
    padding:22
},
titleContainer:{
flexDirection:"row",
alignItems:'center',
marginTop:53
},
title:{
color:'white',
fontFamily:"Poppins_700Bold",
fontSize:33,
marginRight:12
},
bar:{
backgroundColor:colors.barColor,
height:2,
width:110
},
inputContainer:{
marginTop:43
},
label:{
color:colors.lightGrey,
fontFamily:"Poppins_600SemiBold",

},
input:{
   width:"100%",
   height:60,
   backgroundColor:colors.inputBg,
   borderRadius:6,
   marginTop:12,
   color:'white',
    fontFamily:"Poppins_600SemiBold",
    paddingLeft:12,
    marginBottom:22
},
btn:{
width:"100%",
height:60,
backgroundColor:colors.green,
justifyContent:'center',
alignItems:'center',
borderRadius:6,
marginTop:12
},
btnText:{
    color:'black',
    fontFamily:"Poppins_600SemiBold",
    fontSize:22,
}

})