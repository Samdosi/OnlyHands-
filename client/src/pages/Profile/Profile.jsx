import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './components/Card';
import InfoModal from './components/InfoModal';
import AvatarModal from './components/AvatarModal';
import Cookies from "universal-cookie";
import { CgProfile } from 'react-icons/cg';
import { IconContext } from "react-icons";
import imageOne from './avatars/1.jpg'
import imageTwo from './avatars/2.jpg'
import imageThree from './avatars/3.jpg'
import imageFour from './avatars/4.jpg'
import imageFive from './avatars/5.jpg'

const Profile = ({ setBgImage }) => {
    const cookies = new Cookies();
    const { pathname } = useLocation();
    setBgImage(pathname);

    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(false);
    
    const [avatar, setAvatar] = useState(null);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const handleAvatarModal = () => setShowAvatarModal(false);


    const avatarImages = [
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        imageFive
      ]

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
                    setAvatar(data["profile"]["image"])
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
            <div className='flex flex-row justify-center center-items lg:justify-start'>
                <button
                    onClick={() => { setShowModal(true) }}
                    className="bg-white transition text-black font-bold p-3 2xl:p-4 rounded-lg shadow-md grow-transition">
                    My Stats
                </button>
                <button
                    onClick={() => { setShowAvatarModal(true) }}
                    >
                    {avatar ? 
                    <img
                        className='rounded-lg transition grow-transition ml-3'
                        src={avatarImages[cookies.get("profile")["image"]]} 
                        style={{width: "4em", height: "4em", borderRadius: "50%"}}
                        />: 
                    (<IconContext.Provider value={{ color: "white", size: "4em", className: "avatar_icon"}}>
                        <CgProfile />
                    </IconContext.Provider>)}
                </button>
            </div>
            <div className="right col-span-2 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col justify-center overflow-hidden">
                    <Card />
                </div>
            </div>
            {showModal && <InfoModal onClose={handleModal} />}
            {showAvatarModal && <AvatarModal onClose={handleAvatarModal} />}
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