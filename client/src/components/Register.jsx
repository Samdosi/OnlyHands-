import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1 className="font-semibold text-center text-xl p-2">
                Welcome to OnlyHands!
            </h1>
            <form >
                <div className="flex flex-col">
                <label htmlFor="username">Username
                        <br />
                        <input
                            value={username}
                            id="username"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="username">Email
                        <br />
                        <input
                            value={email}
                            id="email"
                            type="email"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="example@example.com"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password">Password
                        <br />
                        <input
                            value={password}
                            id="password"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="*********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="text-center">
                    <button className="px-5 py-2 bg-gray-700 text-white rounded">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register