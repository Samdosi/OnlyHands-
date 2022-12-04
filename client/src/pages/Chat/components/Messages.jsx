import React from 'react';
import MessageButton from './MessageButton';

const Messages = ({ setShowChat, messages = [] }) => {

  return (
    <div className=' w-full h-[74%] messages'>

      <h1 className='text-lg md:text-xl pb-3 text-[#ff405b]'>Messages</h1>

      <div className='w-full h-[92%] overflow-y-auto overflow-hidden hide-scrollbar'>

        {
          messages.map( c => {
            return(
              <MessageButton 
                name={c.firstName + " " + c.lastName}
                picture={c.picture}
                newMessage={c.newMessage}
                online={c.online}
                matchId={c.matchId}
                profileId={c.profileId}
                setShowChat={setShowChat}
              />
            )
          })
        }

      </div>
    </div>
  )
}

export default Messages;