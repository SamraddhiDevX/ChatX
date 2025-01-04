import React, { useEffect, useState } from 'react'
import { chatStore } from '../store/chatStore'
import {Users} from "lucide-react";
import { authStore } from '../store/authStore';

const Sidebar = () => {
  const {getUsers,isUsersLoading,users,selectedUsers,setSelectedUsers}= chatStore();
  const {onlineUsers}=authStore();
  const [showOnlineUser, setShowOnlineUser]=useState(false);
  
   useEffect(()=>{
    getUsers();
   },[getUsers])
  
const filterOnlineUser= showOnlineUser? users.filter((user) => onlineUsers.includes(user._id)) : users;


   const contacts= Array(8).fill(null);
 
   if (isUsersLoading) {
    return (
      <aside className='h-full w-20 lg:w-2/6 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-[18px]'>
          <div className='flex items-center gap-4'>
              <Users className="size-6" />
              <span className='font-medium hidden lg:block'>Chats</span>
          </div>
      </div>
    <div className='overflow-y-auto w-full py-3 px-6'>
      { contacts.map((_,idx)=>(
        <div   key={idx} className="w-full p-3 flex items-center gap-3">
        <div className='relative mx-auto lg:mx-0'>
          <div className='skeleton sie-12 rounded-full'></div>
        </div>
         <div className='hidden lg:block text-left min-w-0 flex-1'>
          <div className='skeleton h-4 w-32 mb-2'>
            <div className='skeleton h-3 w-16'></div>
          </div>
         </div>
        </div>
      )) }

    </div>
  </aside>
    )}

  return (
  <aside className='h-full w-20 lg:w-2/6 border-r border-base-300 flex flex-col transition-all duration-200'>
   <div className='border-b border-base-300 w-full p-[18px]'>
          <div className='flex items-center gap-4'>
              <Users className="size-6" />
              <span className='font-medium hidden lg:block'>Chats</span>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className='cursor-pointer flex items-center gap-2'>
              <input type="checkbox" 
              checked={showOnlineUser}
              onChange={(e)=> setShowOnlineUser(e.target.checked)}
              className='checkbox checkbox-sm'
              />
              <span className='text-sm'> Show Online users</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length-1} online)</span>
            </div>
      </div>
      <div className='overflow-y-auto w-full py-3 px-5'>
        {filterOnlineUser.map((user)=>{
          return(
          <button key={user._id}
          onClick={()=> setSelectedUsers(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUsers?._id===user._id ? "bg-base-300 ring-1 ring-base-300":""}`}
          >
            <div className='relative mx-uto lg:mx-0'>
            {onlineUsers.includes(user._id) && (
              <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
            ) }
            </div>

            <div className='hidden lg:block text-left mim-w-0'>
              <div className='font-medium truncate'>{user.fullname}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id)? "Online":"Offline"}
              </div>
            </div>
          </button>
        )})}
        {filterOnlineUser.length===0 &&(
          <div className='text-center text-zinc-500 py-4'>No user found</div>
        )

        }
      </div>
  </aside>
  )
}

export default Sidebar
