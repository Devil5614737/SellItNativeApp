import * as SecureStore from 'expo-secure-store';


const key = 'authToken';

const setToken = async authToken => {
    try {
         await SecureStore.setItemAsync(key, authToken)
    } catch (error) {
        console.log(error)
    }
};

const getToken=async ()=>{
    try {
        return await SecureStore.getItemAsync(key);
        
    } catch (error) {
        console.log("Error getting the auth token", error);
    }
}

const removeToken=async()=>{
    try {
        await SecureStore.deleteItemAsync(key)
    } catch (error) {
        
    }
};


export default {
    getToken,removeToken,setToken
}