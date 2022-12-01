import React, { useState } from "react";
import io from "socket.io-client";
import { Hero, Chat , Profile, PasswordReset, Rules, About } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import heroBG from './assets/hero.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const socket = io.connect("https://only-hands.herokuapp.com:5000");

const App = () => {
  
  const [bgImage, setBgImage] = useState('/');

  const bgImages = {
    '/': heroBG
  }
  return (
    <div 
      className="w-screen max-w-full h-screen hero px-3 sm:px-8 lg:px-12 overflow-y-auto overflow-x-clip" 
      style={bgImage === '/chat' ? {background: '#252525'} : {backgroundImage: `url(${bgImages[bgImage]})`}}
    >
      <ToastContainer/>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero setBgImage={setBgImage}/>}/>
          <Route path="/chat" element={<Chat setBgImage={setBgImage} socket={socket}/>} />
          <Route path="/profile" element={<Profile setBgImage={setBgImage}/>}/>
          <Route path="/passwordReset" element={<PasswordReset setBgImage={setBgImage}/>}/>
          <Route path="/rules" element={<Rules setBgImage={setBgImage}/>}/>
          <Route path="/about" element={<About setBgImage={setBgImage}/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;