import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Hero = ({ setBgImage }) => {

    const {pathname} = useLocation();
    setBgImage(pathname);
    
    const navigate = useNavigate();

    return (
        <div className="text-white w-full h-full md:h-[80%] flex flex-col justify-around items-center text-center ">

            <h1 className="text-4xl lg:text-5xl font-bold">Swipe Right, Start Fights</h1>

            <div className="flex flex-col justify-around h-1/3 md:h-1/3 lg:text-lg md:font-medium">
                <button className="bg-white hover:bg-gray-200 transition text-black p-3 2xl:p-4 rounded-lg shadow-md">
                    Create Account
                </button>
                <button 
                    onClick={() => {navigate('/login')}}
                    className=' p-3 2xl:p-4 rounded-lg shadow-md border transition'
                >
                    Log in
                </button>
            </div>
        </div>
    );
}

export default Hero;