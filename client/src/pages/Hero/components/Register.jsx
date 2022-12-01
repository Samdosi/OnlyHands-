import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Register = ({ handleModal }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function notify() {
    toast("Your account has been created!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    toast.configure();
  }

  const doRegister = async (event) => {
    event.preventDefault();

    if (username.length === 0 || password.length < 8 || !isValidEmail(email)) {
      setError(true);
    }

    fetch("https://only-hands.herokuapp.com/api/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["success"]) {
          console.log(data.message);
          handleModal();
          notify();
        } else console.log(data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1 className="font-semibold text-center text-xl p-2">
          Welcome to OnlyHands!
      </h1>
      <form onSubmit={doRegister}>
          <div className="flex flex-col">
              <label htmlFor="username">Username
                  <br />
                  <input
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      className="border border-gray-700 p-2 rounded mb-3"
                      placeholder="Username"
                  />
                  {error&&username.length<=0? 
                  <p className="text-s text-red-600 mb-2">Please enter a valid username.</p>:""}
              </label>
              <label htmlFor="username">Email
                  <br />
                  <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="border border-gray-700 p-2 rounded mb-3"
                      placeholder="example@example.com"
                  />
                  {error&&!isValidEmail(email)? 
                  <p className="text-s text-red-600 mb-2">Please enter a valid email.</p>:""}
              </label>
              <label htmlFor="password">Password
                  <br />
                  <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      className="border border-gray-700 p-2 rounded mb-3"
                      placeholder="********"
                  />
                  {error&&password.length<8?
                  <p className="text-s text-red-600 mb-2">Please enter a valid password.</p>:""}
              </label>
          </div>
          <div className="text-center">
              <button type="submit" className="px-5 py-2 m-2 bg-gray-700 text-white rounded grow-transition">
                  Sign Up
              </button>
          </div>
      </form>
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
  );
};

export default Register;
