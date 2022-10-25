import React from 'react';

const Modal = ({ visible, onClose }) => {

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose();
    }

    if (!visible) return null;

    return (
        <div id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded w-72 text-gray-700">
                <h1 className="font-semibold text-center text-xl p-2">
                    Welcome Back!
                </h1>

                <div className="flex flex-col">
                    <label htmlFor="email">Email
                    <br />
                    <input
                        id="email"
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-5"
                        placeholder="email@example.com"
                    />
                    </label>
                    <label htmlFor="password">Password
                    <br />
                    <input
                        id="password"
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-5"
                        placeholder="*********"
                    />
                    </label>
                </div>
                <div className="text-center">
                    <button className="px-5 py-2 bg-gray-700 text-white rounded">
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;