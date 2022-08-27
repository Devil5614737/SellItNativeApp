import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../helpers/colors";
import { Feather } from '@expo/vector-icons';

export const UploadBtn=({onPress})=>{
    return (
       <TouchableOpacity onPress={onPress}>
         <View style={styles.container}>
        <Feather name="plus" size={40} color="black" />
        </View>
       </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:colors.green,
        bottom:40,
        borderColor:"#141414",
        borderWidth:10,
        alignItems:'center',
        justifyContent:'center'
    }
})