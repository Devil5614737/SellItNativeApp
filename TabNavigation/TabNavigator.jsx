import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import HomeScreen from '../screens/Home';
import AccountScreen from "../screens/Account";
import { UploadBtn } from "./UploadBtn";
import { FontAwesome } from '@expo/vector-icons';
import UploadItem from "../screens/UploadItem";
import { colors } from "../helpers/colors";


export const TabNavigator = () => {
    let [fontsLoaded, error] = useFonts({
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    


  const Tab = createBottomTabNavigator();

  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    return (
 

        <Tab.Navigator
      
        screenOptions={{headerShown:false,
        tabBarActiveTintColor:colors.green,
        tabBarInactiveTintColor:'#4A4A4A',
        tabBarStyle:{
          height: 70,
          width: '100%',
            backgroundColor:"#141414",
            paddingBottom:12,
            borderTopWidth:0,
            paddingTop:7

        },
        tabBarLabelStyle:{
          fontSize:13,
          fontFamily:"Poppins_500Medium",
          
        }
       }} 
       

       >
          <Tab.Screen
           name='Home'
            component={HomeScreen}
            options={{
              tabBarIcon:({size,color})=><Entypo name="home" color={color} size={size}/>
            }}
            />
          <Tab.Screen
           name='Upload'
           
            component={UploadItem}
            options={({navigation})=>
             ( {
              
              tabBarButton:()=><UploadBtn onPress={()=>navigation.navigate("Upload")}/>,
              tabBarIcon:({size,color})=><Entypo name="home" color={color} size={size}/>
            })}
            />
          <Tab.Screen
           name='Account'
            component={AccountScreen}
            options={{
              tabBarIcon:({size,color})=><FontAwesome name="user" size={size} color={color} />
            }}
            />

         
         
   
        </Tab.Navigator>
     

  );
  }
  
  
 
};