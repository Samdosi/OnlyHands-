import React, { useState , useEffect } from 'react';
import ProfileModal from "./Components/ProfileModal"
import Card from './components/Card'
import InfoModal from './components/InfoModal';

/* Modal is only rendered if user has not created a profile. Otherwise, shows them the normal swipe screen. */

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const Profile = ({ setBgImage }) => {

    const { pathname } = useLocation();
    setBgImage(pathname);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState(0);
    const [reach, setReach] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [fights, setFights] = useState(0);
    const [kos, setKOS] = useState(0);
    const [style, setStyle] = useState('');
    const [bio, setBio] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    // James' Modal Info
    // const [showModal, setShowModal] = useState(false);
    // const handleModal = () => setShowModal(false);

    const createProfile = async event => {
        
        event.preventDefault();
        const token = sessionStorage.getItem(token);

    useEffect(() => {
        fetch('https://only-hands.herokuapp.com/api/profile/', {
            method: 'GET',
            headers: { 'x-access-token' : sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
        })
            .then((res) => { 
                return res.json() 
            })
            .then((data) => {
                if (data["success"]) {
                    console.log(data["profile"])
                }
                else {
                    console.log(data["message"]);
                    setShowModal(true) // open profile modal
                }
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <div>
                Profile
            </div>
            {showModal && <ProfileModal />}
        </div>
    )
    // return (
    //     <div className='grid grid-cols-3 gap-3'>
    //         <div classname="left col-span-1 bg-white">
    //         <button
    //             onClick={() => {setShowModal(true)}}
    //             className="bg-white transition text-black p-3 2xl:p-4 rounded-lg shadow-md grow-transition">
    //             Show Modal
    //         </button>
    //         </div>
    //         <div className="right col-span-2 flex flex-col justify-center items-center">
    //             <div className="w-full relative flex flex-col justify-center overflow-hidden">
    //                 <Card />
    //             </div>
    //         </div>
    //         {showModal && <InfoModal onClose={handleModal} />}
    //     </div>
    // )
}

export default Profile