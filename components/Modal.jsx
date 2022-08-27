import { Text,Modal as Mdl,StyleSheet, View, Image } from "react-native";
import { colors } from "../helpers/colors";
import { Button } from "./Button";
import AppLoading from "expo-app-loading";
import MapView from 'react-native-maps';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";
import { Marker } from 'react-native-maps';



export const Modal=({setModalVisible,modalVisible})=>{
  const{specificProduct}=useContext(PostContext)
  let [fontsLoaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  
const region={
      latitude: specificProduct&&specificProduct.latitude,
      longitude: specificProduct&&specificProduct.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
}

    if(!fontsLoaded){
      return <AppLoading/>
    }else{
      return (
        <>
        
        <View style={styles.container}>
            <Mdl
            style={styles.container}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
    <View style={styles.container}>
<Image source={{uri:specificProduct&&specificProduct.image}} resizeMode='cover' style={styles.image}/>
<View style={styles.infoContainer}>
  <Text style={styles.title}>{specificProduct&&specificProduct.title}</Text>
  <Text style={styles.price}>${specificProduct&&specificProduct.price}</Text>
  <View style={styles.userContainer}>
    <Image resizeMode="cover" style={styles.avatar} source={{uri:specificProduct&&specificProduct.postedBy.pic}}/>
    <Text style={styles.username}>{specificProduct&&specificProduct.postedBy.fullname}</Text>
  </View>
    <Button  style={styles.button}>
      <Text style={styles.buttonText}>Contact</Text>
    </Button>
</View>
    <MapView style={styles.map} 
     region={region}
     zoomEnabled
     zoomControlEnabled
     followsUserLocation
  
     >
<Marker
coordinate={{latitude:region.latitude,longitude:region.longitude}}
title={specificProduct&&specificProduct.title}
description={specificProduct&&specificProduct.desc}

/>
</MapView>
    </View>
      </Mdl>
   
        </View>
        </>
    )
    }

   
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.dark,
    position:'relative',
    overflow: 'hidden',
  },
  image:{
    width:"100%",
    height:300,

  },
  infoContainer:{
  padding:22,
  },
  title:{
color:'white',
fontFamily:"Poppins_600SemiBold",
fontSize:22
  },
  price:{
    color:colors.green,
    fontFamily:"Poppins_400Regular",
    fontSize:15
  },
  userContainer:{
flexDirection:'row',
alignItems:'center',
marginTop:12
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginRight:12
  },
  username:{
    color: colors.cardTitle,
    fontFamily:"Poppins_500Medium",
    fontSize:15
  },
  button:{
width:'100%',
height:50,
backgroundColor:colors.midDark,
borderRadius:6,
marginTop:16,
justifyContent:'center',
alignItems:'center'
  },
  buttonText:{
    color:colors.lightGrey,
    fontFamily:"Poppins_500Medium",
    fontSize:17
  },
  map:{
    width:'100%',
    flex:1,
  }
})