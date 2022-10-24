import React, { useState } from 'react';
import { NewMessages, Messages, ChatContainer } from './components';
import { useLocation } from 'react-router-dom';

const Chat = ({ setBgImage }) => {

  const {pathname} = useLocation();
  setBgImage(pathname);

  const [showChatContainer, setShowChatContainer] = useState(false);

  return (
    <div className='text-white w-full h-[90%] min-h-[290px] flex '>

      { !showChatContainer && 
        <div className='w-full flex-auto md:max-w-[45%] lg:max-w-[35%] md:border-r-[1px] md:border-r-gray-600 md:border-solid '>
        <NewMessages />
        <Messages />
      </div>
      }

      <div className={showChatContainer ? 'w-full h-full md:w-[55%] lg:w-[65%]' : ' hidden h-full md:block w-full md:w-[55%] lg:w-[65%] ' }>
        <ChatContainer />
      </div>
    </div>
  )
}

export default Chat;