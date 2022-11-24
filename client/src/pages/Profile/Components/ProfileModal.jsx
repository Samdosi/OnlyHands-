import React, { useState } from "react";

const ProfileModal = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState(0);

    const [nickname, setNickname] = useState('');
    const [reach, setReach] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [KOs, setKOs] = useState(0);
    const [totalFights, setTotalFights] = useState(0);
    const [style, setStyle] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);

    const createProfile = async event => {

        event.preventDefault();

        // TO DO: check if non-required values are empty; don't send any empty values to avoid joi error. 
        // also need to figure out how to store an image 

        fetch('https://only-hands.herokuapp.com/api/profile/', {
            method: 'POST',
            headers: { 'x-access-token' : sessionStorage.getItem('token'), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                age: age,
                height: height,
                weight: weight,
                nickname: nickname,
                reach: reach,
                wins: wins,
                losses: losses,
                KOs: KOs,
                totalFights: totalFights,
                style: style,
                bio: bio,
            })
        })
            .then((res) => { 
                return res.json() 
            })
            .then((data) => {
                if (data["success"]) {
                    console.log(data["message"])
                }
                else
                    console.log(data["message"]);
            })
            .catch(error => console.log(error))
    }

    return (
        <div id="container"
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded w-4/5 h-4/5 text-gray-700">
                <div className="flex justify-around">
                    <form onSubmit={createProfile}>
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
                                <select onChange={(e) => setGender(e.target.value)} className="text-black rounded w-24 h-8 mr-10">
                                    <option selected value=""></option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
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
                        <div className="relative flex py-4 items-center">
                            <div className="flex-grow border-t border-white"></div>
                            <span className="flex-shrink mx-4 text-2xl text-white">Statistics</span>
                            <div className="flex-grow border-t border-white"></div>
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
                                    name="KOs"
                                    min="0"
                                    onChange={(e) => setKOs(e.target.value)}
                                />
                            </label>
                            <label >Total Fights
                                <br />
                                <input 
                                    className="text-black rounded h-8 w-24 mr-10"
                                    type="number" 
                                    name="fights"
                                    min="0"
                                    onChange={(e) => setTotalFights(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="flex justify-center mt-10">
                            <button type="submit" className="border-2 rounded w-32 text-center">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal