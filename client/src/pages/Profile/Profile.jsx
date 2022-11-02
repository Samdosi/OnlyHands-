import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = ({ setBgImage }) => {

    const { pathname } = useLocation();
    setBgImage(pathname);

    return (
        <div>
            
        </div>
    )
}

export default Profile
