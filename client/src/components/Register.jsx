// Need username, pw, email

const Register = () => {
    return (
        <div ref={clickLoginRef} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded w-72 text-gray-700">
                <h1 className="font-semibold text-center text-xl p-2">
                    Welcome to OnlyHands!
                </h1>
                <form onSubmit={doRegister}>
                    <div className="flex flex-col">
                    <label htmlFor="username">Username
                        <br />
                        <input
                            value={username}
                            id="username"
                            type="text"
                            required
                            className="border border-gray-700 p-2 rounded mb-5"
                            placeholder="user13"
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default Register;