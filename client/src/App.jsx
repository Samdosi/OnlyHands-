import React from "react";
import { Hero, Login } from "./pages";
import { Navbar } from "./components";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BackgroundImg from './assets/login-bg.jpg'

const App = () => {
  return (

    <div className=" hero h-full w-full ">
      {/* <div className=" absolute top-0 min-h-screen min-w-screen -z-10 ">
        <img src={BackgroundImg} alt="bg-image" className="object-cover" />
      </div> */}
    {/* <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter> */}
    </div>
  )
}

export default App;