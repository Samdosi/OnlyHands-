import React, { useState } from 'react'
import imageOne from '../avatars/1.jpg'
import imageTwo from '../avatars/2.jpg'
import imageThree from '../avatars/3.jpg'
import imageFour from '../avatars/4.jpg'
import imageFive from '../avatars/5.jpg'
import Cookies from 'universal-cookie'
import { useToastyContext } from "../../../context/ToastyContext";

const AvatarModal = ({ onClose }) => {
  const cookies = new Cookies();
  const notify = useToastyContext();

  const avatarImages = [
    imageOne,
    imageTwo,
    imageThree,
    imageFour,
    imageFive
  ]

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  }

  const changeIcon = (index) => {
    let body = JSON.stringify({
      firstName: cookies.get("profile")["firstName"],
      lastName: cookies.get("profile")["lastName"],
      gender: cookies.get("profile")["gender"],
      age: cookies.get("profile")["age"],
      height: cookies.get("profile")["height"],
      weight: cookies.get("profile")["weight"],
      nickname: cookies.get("profile")["nickname"],
      reach: cookies.get("profile")["reach"],
      wins: cookies.get("profile")["wins"],
      losses: cookies.get("profile")["losses"],
      style: cookies.get("profile")["style"],
      bio: cookies.get("profile")["bio"],
      KOs: cookies.get("profile")["KOs"],
      totalFights: cookies.get("profile")["totalFights"],
      image: String(index)
    })

    console.log(body);

    fetch("https://only-hands.herokuapp.com/api/profile/", {
      method: "PUT",
      headers: {
        "x-access-token": cookies.get("token"),
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          console.log(data["message"]);
          notify(data["message"]);
          cookies.set("profile", body);
          // profile = cookies.get("profile");
          onClose();
          window.location.reload(); //! REMOVE IF POSSIBLE
        } else {
          console.log(data["message"]);
          notify(data["message"], "error");
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="info-modal bg-white rounded text-gray-700 p-2">
        <div className="flex m-2">
          <div className="flex flex-row justify-center items-center">
            {avatarImages.map((image, index) => (
              <button
                className='rounded-lg transition grow-transition'
                style={{width: "100%", height: "100%"}}
                alt="icon"
                onClick={() => changeIcon(index)}
              >
                <img src={image} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvatarModal