import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import InfoModal from './components/InfoModal';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";

const Profile = ({ setBgImage }) => {
    const cookies = new Cookies();
    const { pathname } = useLocation();
    setBgImage(pathname);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(false);

    useEffect(() => {
        fetch('https://only-hands.herokuapp.com/api/profile/', {
            method: 'GET',
            headers: { "x-access-token": cookies.get("token"), 'Content-Type': 'application/json' }
        })
            .then(async (res) => {
                if(res.status == 401){
                    navigate('/');
                }
                if(res.status == 403){
                    const {message} = await res.json();
                    if (message !== "Profile ID is required")
                        navigate('/');
                }
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
