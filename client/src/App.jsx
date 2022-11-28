import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Hero, Chat } from "./pages";
import { Navbar } from "./components";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import heroBG from './assets/hero.png';

const socket = io.connect("https://only-hands.herokuapp.com/");

const App = () => {
  
  const [bgImage, setBgImage] = useState('/');

  const bgImages = {
    '/': heroBG
  }

  useEffect(() => {
    //window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        //window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
    }
  })

const handleTabClosing = () => {
    fetch("https://only-hands.herokuapp.com/api/user/login",{
      method: 'DELETE',
      headers:{
        'x-access-token': sessionStorage.getItem('token')
      },
      
    })
      .then(response => console.log(response.status()))
      .catch(e => console.log(e))

    sessionStorage.removeItem('token')
}

  return (
    <div 
      className="w-screen max-w-full h-screen hero px-3 sm:px-8 lg:px-12 overflow-y-auto overflow-x-clip" 
      style={bgImage === '/chat' ? {background: '#252525'} : {backgroundImage: `url(${bgImages[bgImage]})`}}
    >
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Hero setBgImage={setBgImage}/>}/>
          <Route path="/chat" element={<Chat setBgImage={setBgImage} socket={socket}/>} />
          {/* <Route path="/profile" element={<Profile setBgImage={setBgImage}/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
