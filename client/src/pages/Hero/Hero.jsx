import React from "react";

const Hero = () => {
    return (
        // Hero content div
        <div>
            {/* Trying to absolutely place text + btns in the center*/}
            <div className="absolute text-[70px] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto">
                <h1>Swipe Right, Start Fights</h1>
                <div className="flex-row justify-center align-center">
                    <div className="flex justify-center align-center m-10 transition-all">
                        <button className="w-56 h-16 bg-neutral-50 hover:bg-neutral-300 text-black p-2 m-2 rounded-md text-base">
                            Create Account
                        </button>
                    </div>
                    <div className="flex justify-center align-center transition-all">
                        <button className="w-56 h-16 bg-transparent border border-white hover:bg-neutral-300 hover:text-black text-white rounded-md text-base">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;