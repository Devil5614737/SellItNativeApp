import { clientApi } from "./client";

const signup=(fullname,email,password)=>clientApi.post('/signup',{fullname,email,password})

const login =(email,password)=>clientApi.post('/login',{email,password})


export {signup,login}