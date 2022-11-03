import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../../hooks';
import { AiOutlineLoading } from 'react-icons/ai';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
    const doLogin = async event =>  {

        event.preventDefault();

        fetch('https://only-hands.herokuapp.com/api/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((res) => res.json)
        .then((data) => {
            console.log(data);
            sessionStorage.setItem("token", data.token);
            navigate('/profile');
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-xl p-2">
                Welcome Back!
            </h1>
            <form>
                <div className="flex flex-col">
                    <label htmlFor="username">Username
                        <br />
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="Username"
                        />
                    </label>
                    <label htmlFor="password">Password
                        <br />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            name="password"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="*********"
                        />
                    </label>
                </div>
                <div className="text-center">
                    <button onClick={ doLogin } type="submit" className="px-5 py-2 m-2 bg-gray-700 text-white rounded grow-transition">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;