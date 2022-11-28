import { useState } from 'react';
import { GiReturnArrow } from 'react-icons/gi';
import Login from './Login';
import Register from './Register';

const Modal = ({ onClose, isLoginTab, toggleTab }) => {

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose();
    }

    return (
        <div id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded w-72 text-gray-700">
                <div className="flex justify-around">
                    <div className={ `w-full rounded-tl ${isLoginTab ? 'bg-slate-300' : ''}`}>
                        <button className={ `w-full p-1 ${!isLoginTab ? 'font-bold' : ''}`}
                            onClick={() => toggleTab(false)}>
                            Register
                        </button>
                    </div>
                    <div className={`w-full rounded-tr ${!isLoginTab ? 'bg-slate-300' : ''}`}>
                        <button className={ `w-full p-1 ${isLoginTab ? 'font-bold' : ''}`}
                            onClick={() => toggleTab(true)}>
                            Login
                        </button>
                    </div>
                </div>
                {isLoginTab ? <Login /> : <Register handleModal={onClose} />}
            </div>
        </div>
    )
}

export default Modal