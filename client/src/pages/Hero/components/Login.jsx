import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../../hooks';
import { AiOutlineLoading } from 'react-icons/ai';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const doLogin = async event =>  {

        event.preventDefault();

        if (username.length == 0 || password.length < 8) {
            setError(true);
        }

        fetch('https://only-hands.herokuapp.com/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((res) => { 
            return res.json() 
        })
        .then((data) => {
            if (data["status"] === "success") {
                sessionStorage.setItem("token", data.token);
                navigate('/profile');
            }
            console.log(data["message"])
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-xl p-2">
                Welcome Back!
            </h1>
            <form onSubmit={doLogin}>
                <div className="flex flex-col">
                    <label htmlFor="username">Username
                        <br />
                        <input
                            className="border border-gray-700 p-2 rounded mb-3"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                        />
                        {error&&username.length<=0? 
                        <p className="text-s text-red-600 mb-2">Please enter a valid username.</p>:""}
                    </label>
                    <label htmlFor="password">Password
                        <br />
                        <input
                            className="border border-gray-700 p-2 rounded mb-3"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                        {error&&password.length<8?
                        <p className="text-s text-red-600 mb-2">Please enter a valid password.</p>:""}
                    </label>
                </div>
                <div className="text-center">
                    <button type="submit" className="px-5 py-2 m-2 bg-gray-700 text-white rounded grow-transition">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;