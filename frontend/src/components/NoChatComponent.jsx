import React from 'react';
import { MessageCircle } from 'lucide-react'; // Importing Lucide React icon

const NoChatComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-base-100 text-base-content">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-4 flex space-x-3">
          <MessageCircle className="w-8 h-8 text-gray-400" />
          <h1 className="text-xl font-semibold">No Chat Selected</h1>
       
        </div>
        {/* Message */}
       
      </div>
    </div>
  );
};

export default NoChatComponent;

