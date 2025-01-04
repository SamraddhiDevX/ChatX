import {create} from 'zustand'
import { axiosIns } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';


const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5001":"/";


export const authStore= create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth: async()=>{
        try {
            const res= await axiosIns.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();

        } catch (error) {
            console.log("error in checkendpoint",error);
            set({authUser: null});
        } finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true});
      try {
      const res=  await axiosIns.post("/auth/signup",data);
      set({authUser: res.data});
      toast.success("Account created successfully");

      get().connectSocket();

      } catch (error) {
        toast.error(error.response.data.message);
      }
      finally{
        set({isSigningUp:false});
      }
    },
    logout: async()=>{
      try {
        await axiosIns.post('/auth/logout');
        set({authUser:null});
        toast.success('Logged out successfully');
        get().disconnectSocket();

      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    login: async(data)=>{
      set({isLoggingIn:true});
      try {
      const res=  await axiosIns.post("/auth/signin",data);
      set({authUser: res.data});
      toast.success("SignedIn successfully");
      
      get().connectSocket();

      } catch (error) {
        toast.error(error.response.data.message);
      }
      finally{
        set({isLoggingIn:false});
      }
    },
    connectSocket:()=>{
      const {authUser} = get();
      if(!authUser || get().socket?.connected) return;

      const socket=io(BASE_URL,{
        query:{
          userId:authUser._id,
        },
      });
      socket.connect();
      set({socket:socket});

      socket.on("getOnlineUsers" ,(userIds)=>{
        set({onlineUsers:userIds});
      })
    },
    disconnectSocket:()=>{
      if(get().socket?.connected) get().socket.disconnect();
    },
}));