import React, { useEffect, useRef } from 'react'
import { chatStore } from '../store/chatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import { authStore } from '../store/authStore';


const ChatComponent = () => {
  const {messages,getMessages,isMessagesLoading,selectedUsers,subscribeToMessage,unsubscribeFromMessage}=chatStore();
  const {authUser} =authStore();
  const messageEndRef = useRef(null);

  useEffect(()=>{
   getMessages(selectedUsers._id);
   subscribeToMessage();

   return ()=>unsubscribeFromMessage();

  },[selectedUsers._id, getMessages,unsubscribeFromMessage,subscribeToMessage])
  
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  function formatMessageTime(createdAt) {
   return new Date(createdAt).toLocaleTimeString("en-US",{
    hour:"2-digit",
    minute:"2-digit",
    hour12:false,
   });
} 
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
   <MessageInput />
  </div>
  )
}

export default ChatComponent
