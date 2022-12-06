import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './components/Card';
import InfoModal from './components/InfoModal';
import Cookies from "universal-cookie";

const Profile = ({ setBgImage }) => {
    const cookies = new Cookies();
    const { pathname } = useLocation();
    setBgImage(pathname);
    const user = cookies.get("profile").firstName;


    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(false);

    useEffect(() => {
        fetch('https://only-hands.herokuapp.com/api/profile/', {
            method: 'GET',
            headers: { "x-access-token": cookies.get("token"), 'Content-Type': 'application/json' }
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data["success"]) {
                    console.log(data["profile"])
                    cookies.set("profile", JSON.stringify(data["profile"]));
                }
                else {
                    console.log(data["message"]);
                    setShowModal(true)
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <div classname="left col-span-1 bg-white">
                <button
                    onClick={() => { setShowModal(true) }}
                    className="bg-white transition text-black font-bold p-3 2xl:p-4 rounded-lg shadow-md grow-transition">
                    My Stats
                </button>
            </div>
            <div className="right col-span-2 flex flex-col justify-center items-center">
                <div className="w-full relative flex flex-col justify-center overflow-hidden">
                    <Card />
                </div>
            </div>
            {showModal && <InfoModal onClose={handleModal} />}
        </div>
    )
}

export default Profile;
// YUCKY CODE YIKES!!! BROKEN NO GOOD!!!
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import Card from "./Components/Card";
// import InfoModal from "./Components/InfoModal";
// import Cookies from "universal-cookie";

// const Profile = ({ setBgImage }) => {
//   const { pathname } = useLocation();
//   setBgImage(pathname);

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [isCreated, setIsCreated] = useState(false);
//   const handleModal = () => setShowProfileModal(false);
//   const cookies = new Cookies();

//   useEffect(() => {
//     fetch("https://only-hands.herokuapp.com/api/profile/", {
//       method: "GET",
//       headers: {
//         "x-access-token": cookies.get("token"),
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         if (data["success"]) {
//           console.log(data["profile"]);
//         }
//         else {
//             console.log(data["message"]);
//             setShowProfileModal(true)
//         }
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div className="grid-cols-3 gap-3">
//       <div classname="left col-span-1 bg-white">
//         <button
//           onClick={() => {setShowProfileModal(true)}}
//           className="bg-white transition text-black p-3 2xl:p-4 rounded-lg shadow-md grow-transition"
//         >
//           Profile
//         </button>
//       </div>
//       <div className="right col-span-2 flex flex-col justify-center items-center">
//         <div className="w-full relative flex flex-col justify-center overflow-hidden">
//           <Card />
//         </div>
//       </div>
//       {showProfileModal && <InfoModal onClose={handleModal} />}
//     </div>
//   );
// };

// export default Profile;