import React, { useState } from 'react';
import { NewMessages, Messages, ChatContainer } from './components';
import { useLocation } from 'react-router-dom';

const Chat = ({ setBgImage }) => {

  const {pathname} = useLocation();
  setBgImage(pathname);

  const [showChatContainer, setShowChatContainer] = useState(false);

  return (
    <div className='text-white w-full h-full flex '>

      { !showChatContainer && 
        <div className='w-full md:w-1/2'>
        <NewMessages />
        <Messages />
      </div>
      }

      <div className={showChatContainer ? 'w-full md:w-1/2 ' : ' hidden md:block w-full md:w-1/2 ' }>
        <ChatContainer />
      </div>
    </div>
  )
}

export default Chat;