import React, { useContext, useState} from "react";

const ProfileContext = React.createContext();

export function useProfileContext(){
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }){

    const [profile, setProfile] = useState(null);

    return(
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}