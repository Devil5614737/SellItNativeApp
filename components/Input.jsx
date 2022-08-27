import { KeyboardTypeOptions, TextInput } from "react-native"



export const Input=({secureTextEntry,type,...props})=>{
   return <TextInput secureTextEntry {...props} keyboardType={type}/>
}