import React, { useState , useEffect } from 'react';
import ProfileModal from "./Components/ProfileModal"

/* Modal is only rendered if user has not created a profile. Otherwise, shows them the normal swipe screen. */

const Profile = () => {
    const [showModal, setShowModal] = useState(false);

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
  );
}

export default Profile