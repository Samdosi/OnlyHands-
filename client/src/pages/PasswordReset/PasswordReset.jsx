import React, { useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const PasswordReset = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");

    function isValidEmail(){
        return /\S+@\S+\.\S+/.test(email);
    }

    function notify() {
        toast.success("Success!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        toast.configure();
    }

    const resetPassword = () => {

        if (password.length == 0 || password != confirmPassword) {
            setError(true);
        }
        else{

            fetch('https://only-hands.herokuapp.com/api/user/password-reset?token='+token, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    password: password, 
                    confirmPassword: confirmPassword
                })
            })
            .then((res) => { 
                return res.json() 
            })
            .then((data) => {
                if (data["success"]) {
                    navigate('/');
                    notify();
                }
                else
                    console.log(data.message);
            })
            .catch(error => console.log(error))
        }
    }

    const handleSubmitEmail = () => {
        if(isValidEmail()){
            setError(null);

            fetch('https://only-hands.herokuapp.com/api/user/forgot-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
            })
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    navigate('/');
                    notify();
                }
                else{
                    setError(data.message)
                }
            })
            .catch(e => console.log(e))
        }
        else{
            setError("Please enter a valid email");
        }
    }

    return (
        <>
            {
                !token
                ?
                    <div className="absolute bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-[25rem] w-4/5 min-w-[15rem] p-5">

                        <h3 className="text-2xl font-bold text-center">Please enter your email</h3>

                        <div className="mt-4">
                            <label className="block" htmlFor="email">Email
                                <input 
                                    type="text" 
                                    className={error ?
                                                "w-full px-4 py-2 mt-2 border border-red-700 rounded-md"
                                                :"w-full px-4 py-2 mt-2 border border-gray-700 rounded-md"
                                            } 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {   error &&
                                        <p className="text-s text-red-600 mb-2">{error}</p>
                                }
                            </label>
                            <div className="flex items-baseline justify-center">
                                <button
                                    onClick={handleSubmitEmail}
                                    className="px-6 py-2 mt-4 text-white bg-gray-700 rounded-lg grow-transition"
                                >
                                    Submit Email
                                </button>
                            </div>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                :
                    <div className="absolute bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-[25rem] w-4/5 min-w-[15rem] p-5">

                        <h3 className="text-2xl font-bold text-center">Change Password</h3>

                        <div className="mt-4">
                            <label className="block" htmlFor="password">Password
                                <input 
                                    type="password" 
                                    className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md" 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {error&&password.length<8? 
                                <p className="text-s text-red-600 mb-2">Must be at least 8 characters.</p>:""}
                            </label>
                            <div className="mt-4">
                                <label className="block">Re-enter password
                                    <input 
                                        type="password" 
                                        className="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md" 
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {error&&password!=confirmPassword? 
                                    <p className="text-s text-red-600 mb-2">Both passwords must match.</p>:""}
                                </label>
                            </div>
                            <div className="flex items-baseline justify-center">
                                <button
                                    onClick={resetPassword}
                                    className="px-6 py-2 mt-4 text-white bg-gray-700 rounded-lg grow-transition"
                                >
                                    Reset password
                                </button>
                            </div>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
            }
        </>
    )
}

export default PasswordReset
