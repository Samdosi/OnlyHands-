import React, { useState, useEffect } from 'react';
import { BiArrowBack, BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { useProfileContext } from '../context/Profile';
import StartConvosImg from '../assets/undraw_group_chat_re_frmo.svg';
import BG from '../assets/bg.webp';

const ChatContainer = ({ setShowChat, socket }) => {

  const { profile, setProfile } = useProfileContext();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: profile?.name,
        author: profile?.name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if(profile && profile?.name !== ""){
      socket.emit("join_room", profile.name);
    }
  }, [profile]);


  return (
    <div className=' text-white w-full h-full relative transition'>
      { profile 
        ?
        <div className='h-full w-full relative '>

          <div className=' z-[2] h-[10%] min-h-[5rem] w-full bg-zinc-900/95 flex items-center justify-between px-2 absolute top-0'>
            <div className='flex items-center w-fit h-full'>
              <div
                onClick={() => {
                  setProfile(null);
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

          <div className='z-[2] w-full h-[90%] overflow-y-auto'>
                {
                  messageList?.map(message => message.message)
                }
          </div>

          <div className=' z-[2] w-full h-[10%] py-1 flex bg-zinc-900'>
            <input
            onKeyUp={(e) => {
              if(e.key === 'Enter') sendMessage();
              else setCurrentMessage(e.target.value)
            }}
              type="text" 
              className=' p-3 w-[90%] h-full bg-inherit border-none '
              placeholder='Type a message'
            />
            <button 
              onClick={sendMessage}
              className='h-full w-[10%] flex justify-center items-center hover:bg-[#333333] active:bg-[#484848] transition'
            >
                <AiOutlineSend style={{width: '60%', height: '60%'}}/>
            </button>
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
            className='absolute bottom-0 w-full h-full z-[4]'
            src={BG} 
            alt="Background" 
          />
        </div>
      }


    </div>
  )
}

export default ChatContainer;