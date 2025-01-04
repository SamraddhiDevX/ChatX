import React from 'react'
import { chatStore } from '../store/chatStore';
import { authStore } from '../store/authStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUsers, setSelectedUsers } = chatStore();
    const { onlineUsers } = authStore();
  
    return (
      <div className="py-6 px-6 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUsers.fullname}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUsers._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
  
          {/* Close button */}
          <button onClick={() => setSelectedUsers(null)}>
            <X />
          </button>
        </div>
      </div>
    );
  };

export default ChatHeader
