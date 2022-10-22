import React, { useState } from "react";
import { Hero, Login } from "./pages";
import { Navbar } from "./components";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import heroBG from './assets/hero.png';
import loginBG from './assets/login.png';

const App = () => {
  
  const [bgImage, setBgImage] = useState('/');

  const bgImages = {
    '/': heroBG,
    '/login': loginBG
  }
  return (
    <div 
      className="w-screen h-screen hero px-3 sm:px-8 lg:px-12 overflow-hidden" 
      style={{backgroundImage: `url(${bgImages[bgImage]})`}}
    >
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Hero setBgImage={setBgImage}/>}/>
          <Route path='/login' element={<Login setBgImage={setBgImage}/>} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;