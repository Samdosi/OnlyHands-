import { useState } from 'react';
import { GiReturnArrow } from 'react-icons/gi';
import Login from './Login';
import Register from './Register';

const Modal = ({ onClose, isLoginTab, toggleTab }) => {

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose();
    }

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded w-72 text-gray-700">
                <div className="flex justify-around">
                    <div>
                        <button className={ ` p-1 ${!isLoginTab ? 'font-bold' : ''}`}
                            onClick={() => toggleTab(false)}>
                            Register
                        </button>
                    </div>
                    <div >
                        <button className={ `p-1 ${isLoginTab ? 'font-bold' : ''}`}
                            onClick={() => toggleTab(true)}>
                            Login
                        </button>
                    </div>
                </div>
                {isLoginTab ? <Login /> : <Register />}
            </div>
        </div>
    )
}

export default Modal