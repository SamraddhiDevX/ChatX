import {create} from 'zustand'
import { axiosIns } from '../lib/axios';
import toast from 'react-hot-toast';
import { authStore } from './authStore';

export const chatStore= create((set,get)=>({
 messages:[],
 users:[],
  selectedUsers:null,
  isUsersLoading:false,
  isMessagesLoading:false,
 
  getUsers: async()=>{
    set({isUsersLoading:true});
    try {
       const res= await axiosIns.get('/message/user');
       //console.log(res);
       set({users:res.data});
       console.log("getuserdata", res.data);
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isUsersLoading:false});
    }
  },
  getMessages: async(userId)=>{
    set({isMessagesLoading:true});
    try {
       const res= await axiosIns.get(`/message/${userId}`);
       set({messages:res.data});
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isMessagesLoading:false});
    }
  },
  sendMessages: async(messageData)=>{
   const {messages,selectedUsers}=get();
   try {
    const res= await axiosIns.post(`/message/send/${selectedUsers._id}`,messageData);
    set({messages:[...messages,res.data]});
   } catch (error) {
    toast.error(error.response.data.message);
   }
  },
  subscribeToMessage:()=>{
   const { selectedUsers}= get();
   if(!selectedUsers) return;

   const socket = authStore.getState().socket;
   socket.on("newMessage",(newMessage)=>{
    if(newMessage.senderId !== selectedUsers._id) return;
    set({
      messages:[...get().messages, newMessage],})
   })
  },

  unsubscribeFromMessage:()=>{
  
    const socket = authStore.getState().socket;
    socket.off("newMessage");
    },

  setSelectedUsers: (selectedUsers)=> set({selectedUsers}),
}));