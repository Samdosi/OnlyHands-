import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImCross } from "react-icons/im";
import Cookies from "universal-cookie";
import { useToastyContext } from "../../../context/ToastyContext";

const InfoModal = ({ onClose }) => {
  const cookies = new Cookies();
  const notify = useToastyContext();
  let profile = cookies.get("profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const options = ["-- Select an option --", "Male", "Female", "Other"];
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState(0);

  const [nickname, setNickname] = useState("");
  const [reach, setReach] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [KOs, setKOs] = useState(0);
  const [totalFights, setTotalFights] = useState(0);
  const [style, setStyle] = useState("");
  const [bio, setBio] = useState("");

  const [image, setImage] = useState(undefined);
  const [preview, setPreview] = useState();

  const [error, setError] = useState(false);

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  useEffect(() => {
    // Fill out profile
    autoFillInfo();
  }, []);

  // useEffect(() => {
  //   if (!image) {
  //     // setPreview(undefined);
  //     return;
  //   }

  //   const imageURL = URL.createObjectURL(image);
  //   setPreview(imageURL);

  //   return () => URL.revokeObjectURL(imageURL);
  // }, [image]);

  const hiddenFileInput = React.useRef(null);

  // Click hidden button
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  // set image when user uploads image
  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    setImage(event.target.files[0]);
    console.log(image);
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    console.log(image);

    // TO DO: check if non-required values are empty; don't send any empty values to avoid joi error.
    // also need to figure out how to store an image

    // If required input is empty
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      gender.length === 0 ||
      age.length === 0 ||
      height.length === 0 ||
      weight.length === 0
    ) {
      setError(true);
    }

    let body = JSON.stringify({
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
      style: style,
      bio: bio,
      KOs: KOs,
      totalFights: totalFights,
    })

    // Determine if creating(POST)/editing(PUT)
    let method = "POST";

    if (profile != null) {
      method = "PUT";
    }

    fetch("https://only-hands.herokuapp.com/api/profile/", {
      method: method,
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
          autoFillInfo();
          onClose();
          window.location.reload(); //! REMOVE IF POSSIBLE
        } else {
          console.log(data["message"]);
          notify(data["message"], "error");
        }
      })
      .catch((error) => console.log(error));

    console.log(image);

    fetch("https://only-hands.herokuapp.com/api/profile/image-upload", {
      // Send image to database
      method: "POST",
      headers: {
        "x-access-token": cookies.get("token"),
      },
      body: image,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          console.log(data["message"]);
          // setIsCreated(true);
          autoFillInfo();
          handleOnClose();
        } else console.log(data["message"]);
      })
      .catch((error) => console.log(error));
  };

  const loadPreviewImage = (event) => {
    console.log(event);
    let image = document.getElementByClassName("preview");
    console.log(image);
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  const autoFillInfo = () => {
    if (profile != null) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setGender(profile.gender);
      setAge(profile.age);
      setHeight(profile.height);
      setWeight(profile.weight);
      setNickname(profile.nickname);
      setReach(profile.reach);
      setWins(profile.wins);
      setLosses(profile.losses);
      setKOs(profile.KOs);
      setTotalFights(profile.totalFights);
      setStyle(profile.style);
      setBio(profile.bio);
      setImage(profile.image);
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="info-modal bg-white rounded w-72 text-gray-700 p-2">
        <div className="flex m-2">
          <div className="top w-full flex justify-between align-center">
            <div className="top-left flex flex-row align-center">
              <button
                className="bg-gray-300 py-3 px-4 rounded"
                onClick={onClose}
              >
                {/* <IoMdArrowRoundBack /> */}
                <ImCross />
              </button>
              <h1 className="modal-title px-3">Your Information</h1>
            </div>
            <div className="top-right flex align-center">
              <button
                onClick={updateProfile}
                className="bg-blue-300 rounded py-3 px-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <hr className="solid" />
        <div className="description p-2">
          <p>
            Please enter your info so we can match you against other fighters.
            You can change it later at anytime.
          </p>
        </div>
        <div className="body flex flex-row m-2">
          <form
            encType="multipart/form-data"
            onSubmit={updateProfile}
            className="flex flex-row w-full"
          >
            <div className="body-left p-2">
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    for="first-name"
                  >
                    First Name
                  </label>
                  <input
                    value={firstName}
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="first-name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    for="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="last-name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    for="nickname"
                  >
                    Nickname
                  </label>
                  <input
                    value={nickname}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="nickname"
                    type="text"
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    for="gender"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      value={gender}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {options.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    for="fighting-style"
                  >
                    Fighting Style
                  </label>
                  <input
                    value={style}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="fighting-style"
                    type="text"
                    onChange={(e) => setStyle(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pr-3 md-3 md:mb-0">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="height"
                    >
                      Height
                    </label>
                    <input
                      value={height}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="height"
                      type="text"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="weight"
                    >
                      Weight
                    </label>
                    <input
                      value={weight}
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="number"
                      type="text"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pl-3 md-3 md:mb-0">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="wins"
                    >
                      Wins
                    </label>
                    <input
                      value={wins}
                      min="0"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="wins"
                      type="number"
                      onChange={(e) => setWins(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="losses"
                    >
                      Losses
                    </label>
                    <input
                      value={losses}
                      min="0"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="losses"
                      type="number"
                      onChange={(e) => setLosses(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="losses"
                    >
                      KOs
                    </label>
                    <input
                      value={KOs}
                      min="0"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="losses"
                      type="number"
                      onChange={(e) => setKOs(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="losses"
                    >
                      Fights
                    </label>
                    <input
                      value={totalFights}
                      min="0"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="losses"
                      type="number"
                      onChange={(e) => setTotalFights(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pr-3 md-3 md:mb-0">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="reach"
                    >
                      Reach
                    </label>
                    <input
                      value={reach}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="reach"
                      type="text"
                      onChange={(e) => setReach(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="age"
                    >
                      Age
                    </label>
                    <input
                      value={age}
                      required
                      min="1"
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="last-name"
                      type="number"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="body-right p-2">
              <div className="w-full px-3">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  for="user_photo"
                >
                  Profile Photo
                </label>
                <div>
                  <form>
                    <button
                      className="bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onClick={handleClick}
                    >
                      Upload photo
                    </button>
                    <input
                      id="user_photo"
                      type="file"
                      accept="image/*"
                      onChange={onSelectFile}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                    {image && <img src={preview} />}
                  </form>
                </div>
              </div>
              <div className="w-full px-3">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  for="about"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  id="about"
                  name="about"
                  rows={3}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  // defaultValue={""}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;

