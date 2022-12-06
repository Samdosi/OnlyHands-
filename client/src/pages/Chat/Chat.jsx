import React, { useState, useEffect } from 'react';
import { SearchBar, Messages, ChatContainer } from './components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileProvider } from './context/Profile';
import Cookies from "universal-cookie";

const Chat = ({ setBgImage, socket }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  setBgImage(pathname);

  const [showChat, setShowChat] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [matchMessages, setMatchMessages] = useState([]);
  const [unMatchMessages, setUnMatchMessages] = useState([]);

  useEffect(() => {
    fetch("https://only-hands.herokuapp.com/api/match?searchQuery=" + searchValue, {
      headers:{
        "x-access-token": cookies.get("token")
      }
    })
      .then(response => {
        if(response.status == 401 || response.status == 403){
          navigate('/');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        let m = []
        let u = []

        data.matches?.forEach(e => {
          if(e.isComplete) m.push(e)
          else u.push(e)
        })

        setMatchMessages(m);
        setUnMatchMessages(u);
      })
      .catch(e => console.log(e))
  }, [searchValue])

  return (
    <div className='text-white w-full h-[90%] min-h-[290px] flex '>

      <ProfileProvider>
        { !showChat && 
          <div className='w-full flex-auto md:hidden'>
            <SearchBar value={searchValue} setValue={setSearchValue} />
            <Messages setShowChat={setShowChat} matchMessages={matchMessages} unMatchMessages={unMatchMessages}/>
          </div>
        }

        <div className='hidden md:block w-full flex-auto md:max-w-[45%] lg:max-w-[35%] md:border-r-[1px] md:border-r-gray-600 md:border-solid '>
          <SearchBar value={searchValue} setValue={setSearchValue} />
          <Messages setShowChat={setShowChat} matchMessages={matchMessages} unMatchMessages={unMatchMessages}/>
        </div>

        <div className={showChat ? 'w-full h-full md:w-[55%] lg:w-[65%]' : ' hidden h-full md:block w-full md:w-[55%] lg:w-[65%] ' }>
          <ChatContainer setShowChat={setShowChat} socket={socket}/>
        </div>
      </ProfileProvider>

    </div>
  )
}

export default Chat;