import React from 'react';
import { BiArrowBack, BiDotsVerticalRounded } from 'react-icons/bi';
import { useProfileContext } from '../context/Profile';
import StartConvosImg from '../assets/undraw_group_chat_re_frmo.svg';
import Bubbles from '../assets/bg.svg';

const ChatContainer = ({ setShowChat }) => {

  const { profile } = useProfileContext();

  return (
    <div className=' text-white bg-black/25 w-full h-full relative transition'>

      { profile 
        ?
        <div className='h-[10%] min-h-[5rem] w-full bg-[#141414e6] bdg-[#3b3b3b50] flex items-center justify-between px-2 absolute top-0'>

          <div className='flex items-center w-fit h-full'>

            <div 
              onClick={() => {
                setShowChat(false)
              }}
              className='md:hidden w-7 h-7 p-1 active:bg-[#484848] rounded-[50%] transition mr-4'>
              <BiArrowBack style={{width: '100%', height: '100%'}}/>
            </div>

            <div className=' h-full flex items-center active:bg-[#484848] '>
              <img
                src={profile.picture}
                alt="profile "
                className='w-10 h-10 rounded-[50%] mr-2'
              />
              <p>{profile.name}</p>
            </div>

          </div>

          <div className='w-7 h-7 p-1 active:bg-[#484848] rounded-[50%] transition'>
            <BiDotsVerticalRounded style={{width: '100%', height: '100%'}} />
          </div>

        </div>
        :
        <div className='relative w-full h-full '>
          <h1 className='text-3xl absolute z-[6] top-1/4 left-1/2 translate-x-[-50%] text-center'>
            Start conversations right away!
          </h1>
          <img
            className='w-1/2 h-1/2 absolute z-[5] top-3/4 left-1/2 translate-y-[-75%] translate-x-[-50%]'
            src={StartConvosImg}
            alt='Start Chatting'
          />
          <img 
            className='absolute bottom-0 w-full h-auto z-[4]'
            src={Bubbles} 
            alt="Background" 
          />
        </div>
      }


    </div>
  )
}

export default ChatContainer;