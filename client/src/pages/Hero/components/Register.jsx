import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const doRegister = async event => {

        event.preventDefault();

        fetch('https://only-hands.herokuapp.com/api/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email, 
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if ( data && data["status"] === "success") window.location.reload();
                throw(data["message"] || "no data");
            })
            .catch(error => console.log(error))
        }

    return (
        <div>
            <h1 className="font-semibold text-center text-xl p-2">
                Welcome to OnlyHands!
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
                    <label htmlFor="username">Email
                        <br />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="example@example.com"
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
                    <button onClick={ doRegister} type="submit" className="px-5 py-2 m-2 bg-gray-700 text-white rounded grow-transition">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register