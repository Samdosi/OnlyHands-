import React, { useState } from 'react';
import { NewMessages, Messages, ChatContainer } from './components';
import { useLocation } from 'react-router-dom';
import { ProfileProvider } from './context/Profile';

const Chat = ({ setBgImage, socket }) => {

  const {pathname} = useLocation();
  setBgImage(pathname);

  const [showChat, setShowChat] = useState(false); 

  return (
    <div className='text-white w-full h-[90%] min-h-[290px] flex '>

      <ProfileProvider>
        { !showChat && 
          <div className='w-full flex-auto md:hidden'>
            <NewMessages />
            <Messages setShowChat={setShowChat}/>
          </div>
        }

        <div className='hidden md:block w-full flex-auto md:max-w-[45%] lg:max-w-[35%] md:border-r-[1px] md:border-r-gray-600 md:border-solid '>
          <NewMessages />
          <Messages setShowChat={setShowChat}/>
        </div>

        <div className={showChat ? 'w-full h-full md:w-[55%] lg:w-[65%]' : ' hidden h-full md:block w-full md:w-[55%] lg:w-[65%] ' }>
          <ChatContainer setShowChat={setShowChat} socket={socket}/>
        </div>
      </ProfileProvider>

    </div>
  )
}

export default Chat;