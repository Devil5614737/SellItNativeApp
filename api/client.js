import {create} from 'apisauce';
import authStore from '../storage/auth';

export const clientApi = create({
    baseURL: 'http://192.168.1.6:4000',
  });




  clientApi.addAsyncRequestTransform(async (request)=>{
    const authToken=await authStore.getToken();
    if(!authToken) return ;
    request.headers["x-auth-token"]=authToken
      });