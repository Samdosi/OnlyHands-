import { useRef , useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const doRegister = async (event) => 
    {
        event.preventDefault();
        
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        var obj = {username: username, email: email, password: password}
        var js = JSON.stringify(obj);
    
        try {
            const response = await fetch('https://only-hands.herokuapp.com/api/register', {
                method:'POST',
                body:js,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var res = JSON.parse(await response.text());
       
            if (res.id <= 0) {
                console.log("user id is WRONGGGGGG")
            } 
          
            else {
                console.log("user id is CORRECTTTT")
                navigate('/profile');
            }
        } 
        catch (e) 
        {
        alert(e.toString());
        return;
        }
      };

    // async function doRegister() {
    //     fetch('https://only-hands.herokuapp.com/api/register', {
    //         method: 'POST', 
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: {
    //             username: JSON.stringify(username),
    //             email: JSON.stringify(email), 
    //             password: JSON.stringify(password)
    //         }
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     })
    // }


    // async function doLogin(url = 'https://only-hands.herokuapp.com/api/register', data = {username, email, password}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //         method: 'POST', 
    //         mode: 'cors',
    //         credentials: 'same-origin', 
    //         headers: { 'Content-Type' : 'application/json' },
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    // }

    // const doRegister = async event => {
    //     console.log(username, email, password);

    //     event.preventDefault();

    //     fetch('https://only-hands.herokuapp.com/api/register', {
    //         method: 'POST',
    //         mode: 'no-cors',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: {
    //             username: JSON.stringify(username),
    //             email: JSON.stringify(email), 
    //             password: JSON.stringify(password)
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //             sessionStorage.setItem("token", data.token);
    //         })
    //         .catch(error => console.log(error))
    //     }

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
                            ref = {usernameRef}
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
                            ref = {emailRef}
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
                            ref = {passwordRef}
                            id="password"
                            type="password"
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