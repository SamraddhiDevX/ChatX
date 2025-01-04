import React from 'react';
import { chatStore } from '../store/chatStore';
import Sidebar from '../components/Sidebar';
import NoChatComponent from '../components/NoChatComponent';
import ChatComponent from '../components/ChatComponent';

const HomePage = () => {
    const {selectedUsers}=chatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-14'>
        <div className='bg-base-100 rounded-lg shadow-lg shadow-cl w-full  h-[calc(100vh-12rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar></Sidebar>
            {!selectedUsers ? <NoChatComponent/>: <ChatComponent/>}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HomePage
