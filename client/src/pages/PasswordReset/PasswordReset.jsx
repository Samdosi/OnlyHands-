import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';

const PasswordReset = ({setBgImage}) => {
    const { pathname } = useLocation();
    setBgImage(pathname); 

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);

    const resetPassword = async event => {
        event.preventDefault();

        if (password.length == 0 || password != confirmPassword) {
            setError(true);
        }

        fetch('https://only-hands.herokuapp.com/api/user/password-reset', {
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
                console.log("Password successfully reset!");
            }
            else
                console.log(data.message);
        })
        .catch(error => console.log(error))
    }

    return (
        <div class="fixed inset-0 flex items-center justify-center min-h-screen">
            <div class="rounded w-1/4 px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 class="text-2xl font-bold text-center">Change Password</h3>
                <form onSubmit={resetPassword}>
                    <div class="mt-4">
                        <label class="block" for="password">Password
                            <input 
                                type="password" 
                                class="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error&&password.length<8? 
                            <p className="text-s text-red-600 mb-2">Must be at least 8 characters.</p>:""}
                        </label>
                        <div class="mt-4">
                            <label class="block">Re-enter password
                                <input 
                                    type="password" 
                                    class="w-full px-4 py-2 mt-2 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {error&&password!=confirmPassword? 
                                <p className="text-s text-red-600 mb-2">Both passwords must match.</p>:""}
                            </label>
                        </div>
                        <div class="flex items-baseline justify-center">
                            <button class="px-6 py-2 mt-4 text-white bg-gray-700 rounded-lg grow-transition">Reset password</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset
