import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiDotsVerticalRounded } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { useProfileContext } from '../context/Profile';
import StartConvosImg from '../assets/undraw_group_chat_re_frmo.svg';
import BG from '../assets/bg.webp';

const ChatContainer = ({ setShowChat, socket }) => {

  const { profile, setProfile } = useProfileContext();
  const navigate = useNavigate();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [prevScroll, setPrevScroll] = useState(0);
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: profile?.matchId,
        from: sessionStorage.getItem('profileId'),
        text: currentMessage,
        timeSent:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if(profile && profile?.profileId !== ""){
      socket.emit("joinRoom", profile.matchId);
    }
    
    fetch('https://only-hands.herokuapp.com/api/chat/' + profile?.matchId, {
      headers:{
        'x-access-token': sessionStorage.getItem('token')
      }
    })
    .then(response => {
      if(response.status == 401 || response.status == 403){
        navigate('/');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if(data.success)
        setMessageList([...data.chats]);
    })
    .catch(e => console.log(e))

    setCurrentMessage("");
  }, [profile]);

  useEffect(() => {

    if(scrollRef.current?.scrollHeight > prevScroll){
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        setPrevScroll(scrollRef.current.scrollHeight);
    }
  
  }, [messageList])


  return (
    <div className=' text-white w-full h-full relative transition'>
      { profile 
        ?
        <div className='h-full w-full relative '>

          <div className=' z-[2] h-[15%] w-full bg-zinc-900/95 flex items-center justify-between px-2 '>
            <div className='flex items-center w-fit h-fit'>
              <div
                onClick={() => {
                  setProfile(null);
                  setShowChat(false)
                }}
                className='md:hidden w-7 h-7 p-1 active:bg-[#484848] rounded-[50%] transition mr-4 cursor-pointer'>
                <BiArrowBack style={{width: '100%', height: '100%'}}/>
              </div>
              <div className=' h-full flex items-center active:bg-[#484848] '>
                {
                  profile.picture
                  ?
                    <img
                      src={profile.picture}
                      alt="profile "
                      className='w-10 h-10 rounded-[50%] mr-2'
                    />
                  :
                    <CgProfile size={38} />
                }
                <p>{profile.name}</p>
              </div>
            </div>
            <div className='w-7 h-7 p-1 active:bg-[#484848] rounded-[50%] transition cursor-pointer'>
              <BiDotsVerticalRounded style={{width: '100%', height: '100%'}} />
            </div>
          </div>

          <div ref={scrollRef} className='z-[2] w-full h-[75%] flex flex-col px-5 overflow-y-auto hide-scrollbar scroll-smooth'>
                {
                  messageList?.map(message => {

                    console.log(message)

                    if(message.from !== sessionStorage.getItem('profileId')){
                      return(
                        <div className='flex flex-col my-4 self-start'>
                          <p
                            className=' overflow-wrap  self-end text-xl text-black bg-green-200 max-w-[18rem] w-auto h-auto p-2 rounded'
                          >
                            {message.text}
                          </p>
                          <p className=' text-xs self-start text-gray-400 max-w-[18rem] w-auto h-auto'>{message.timeSent}</p>
                      </div>
                      )
                    }

                    return(
                      <div className='flex flex-col my-4 '>
                        <p
                          className=' overflow-wrap  self-end text-xl text-black bg-white max-w-[18rem] w-auto h-auto p-2 rounded'
                        >
                          {message.text}
                        </p>
                        <p className='self-end p-1 text-xs text-gray-400 max-w-[18rem] w-auto h-auto'>{message.timeSent}</p>
                      </div>
                      )
                  })
                }
          </div>

          <div className=' z-[2] w-full h-[10%] py-1 flex bg-zinc-900'>
            <input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value) }
              onKeyUp={(e) => {
                if(e.key === 'Enter') sendMessage()
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