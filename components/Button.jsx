import { TouchableHighlight } from "react-native"


export const Button=({children,...props})=>{
    return (
        <TouchableHighlight {...props}>
            {children}
        </TouchableHighlight>
    )
}