import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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

    const createProfile = async event => {
        
        event.preventDefault();
        const token = sessionStorage.getItem(token);

        fetch('https://only-hands.herokuapp.com/api/profile', {
            method: 'GET',
            headers: { 
                'Content-Type' : 'application/json',
                "x-access-token": token 
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                nickname: nickname,
                gender: gender,
                height: height,
                weight: weight,
                reach: reach,
                wins: wins,
                losses: losses,
                kos: kos,
                style: style,
                bio: bio,
                profilePhoto: profilePhoto
            })
        })
            .then((res) => { 
                return res.json() 
            })
            .then((data) => {
                if (data["success"]) {
                    sessionStorage.setItem("token", data.token);
                    navigate('/profile');
                }
                else
                    console.log(data.message);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="text-white mt-5"> 
            <h1 className="text-4xl text-center">Create Profile</h1>
            <div className="flex justify-center">
                <form>
                    <div className="flex justify-start m-10">
                        <label>First Name
                            <br />
                            <input 
                                className="text-black rounded h-8 mr-14"
                                type="text" 
                                name="firstname"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                        <label>Last Name
                            <br />
                            <input 
                                className="text-black rounded h-8"
                                type="text" 
                                name="lastname"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex justify-start m-10">
                        <label>Nickname
                            <br />
                            <input 
                                className="text-black rounded h-8 mr-14"
                                type="text" 
                                name="nickname"
                                onChange={(e) => setNickname(e.target.value)}
                            />  
                        </label>
                        <label>Bio
                            <br />
                            <input 
                                className="text-black rounded h-20"
                                type="text" 
                                name="bio"
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex justify-start m-10">
                        <label>Gender
                            <br />
                            <select className="text-black rounded w-24 h-8 mr-10">
                                <option selected value=""></option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                onChange={(e) => setGender(e.target.value)}
                            </select>
                        </label>
                        <label>Age
                            <br />
                            <input 
                                className="text-black text-center rounded w-10 h-8 mr-10"
                                type="number" 
                                name="age"
                                min="1"
                                max="100"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>
                        <label>Height
                            <br />
                            <input 
                                className="text-black rounded h-8 w-20 mr-10"
                                type="text" 
                                name="height"
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </label>
                        <label>Weight
                            <br />
                            <input 
                                className="text-black rounded h-8 w-20 mr-10"
                                type="number" 
                                name="weight"
                                onChange={(e) => setWeight(e.target.value)}
                            />  
                        </label>
                        <label>Reach
                            <br />
                            <input 
                                className="text-black rounded h-8" 
                                type="text" 
                                name="reach"
                                onChange={(e) => setReach(e.target.value)}
                            />  
                        </label>
                    </div>
                    <div class="relative flex py-4 items-center">
                        <div class="flex-grow border-t border-white"></div>
                        <span class="flex-shrink mx-4 text-2xl text-white">Statistics</span>
                        <div class="flex-grow border-t border-white"></div>
                    </div>
                    <div className="flex justify-center text-start m-8">
                        <label className="mr-10">Style
                            <br />
                            <input  
                                className="text-black rounded h-8"
                                type="text" 
                                name="style"
                                onChange={(e) => setStyle(e.target.value)}
                            />
                        </label>
                        <label>Wins
                            <br />
                            <input 
                                className="text-black rounded h-8 w-14 mr-10"
                                type="number" 
                                name="wins"
                                min="0"
                                onChange={(e) => setWins(e.target.value)}
                            />
                        </label>
                        <label>Losses
                            <br />
                            <input 
                                className="text-black rounded h-8 w-14 mr-10"
                                type="number" 
                                name="losses"
                                min="0"
                                onChange={(e) => setLosses(e.target.value)}
                            />
                        </label>
                        <label>KOs
                            <br />
                            <input 
                                className="text-black rounded h-8 w-14 mr-10"
                                type="number" 
                                name="kos"
                                min="0"
                                onChange={(e) => setKOS(e.target.value)}
                            />
                        </label>
                        <label >Total Fights
                            <br />
                            <input 
                                className="text-black rounded h-8 w-24 mr-10"
                                type="number" 
                                name="fights"
                                min="0"
                                onChange={(e) => setFights(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button type="submit" className="border-2 rounded w-20 text-center">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
