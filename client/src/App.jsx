import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Hero, Chat , Profile, PasswordReset, Rules, About } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import heroBG from './assets/hero.png';
import 'react-toastify/dist/ReactToastify.css';
import { ToastyProvider } from './context/ToastyContext';
import { ToastContainer } from 'react-toastify';

const socket = io.connect("https://only-hands.herokuapp.com/");

const App = () => {
  
  const [bgImage, setBgImage] = useState('/');

  const bgImages = {
    '/': heroBG,
    '/profile': heroBG,
    '/rules': heroBG,
    '/about': heroBG
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
      className="w-screen max-w-full h-screen hero px-3 sm:px-8 lg:px-12 overflow-y-hidden overflow-x-clip" 
      style={bgImage === '/chat' ? {background: '#252525'} : {backgroundImage: `url(${bgImages[bgImage]})`}}
    >
      <ToastyProvider >
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
      </ToastyProvider>
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  )
}

export default App;
