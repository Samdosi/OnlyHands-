import React from "react";
import { Hero, Login } from "./pages";
import { Navbar } from "./components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BackgroundImg from './assets/login-bg.jpg'

const App = () => {
  return (
    <div className="hero h-full">
      <div className="fixed min-h-screen -z-10 bg-black">
        <img src={BackgroundImg} alt="bg-image" className="bg-cover opacity-50" />
      </div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;