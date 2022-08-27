import { clientApi } from "./client";

export const Post=(title,desc,price,image,longitude,latitude)=>clientApi.post('/post',{title,desc,price,image,longitude,latitude});

export const GetData=()=>clientApi.get('/post/allPost');