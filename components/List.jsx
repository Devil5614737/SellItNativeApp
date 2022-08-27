import { View } from "react-native";



export const List=({children,...props})=>{
    return (
        <View {...props}>
            {children}
        </View>
    )
}