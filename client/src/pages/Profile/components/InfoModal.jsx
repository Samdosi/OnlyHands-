import { IoMdArrowRoundBack } from "react-icons/io"

const InfoModal = ({ onClose }) => {

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  }

  return (
    <div id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="info-modal bg-white rounded w-72 text-gray-700 p-2">
        <div className="flex m-2">
          <div className="top w-full flex justify-between align-center">
            <div className="top-left flex flex-row align-center">
              <button
                className="bg-gray-300 p-1 rounded"
                onClick={onClose}>
                <IoMdArrowRoundBack />
              </button>
              <h1 className="modal-title px-3">Your Information</h1>
            </div>
            <div className="top-right flex align-center">
              <button className="bg-blue-300 rounded p-1">Save Changes</button>
            </div>
          </div>
        </div>
        <hr className="solid" />
        <div className="description p-2">
          <p>Please enter your info so we can match you against other fighters. You can change it later at anytime.</p>
        </div>
        <div className="body flex flex-row m-2">
          <form className="flex flex-row w-full">
            <div className="body-left p-2">
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label className="block text-gray-700 font-bold mb-2" for="first-name">
                    First Name
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Joe" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-700 font-bold mb-2" for="last-name">
                    Last Name
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Joe" />
                </div>
              </div>
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label className="block text-gray-700 font-bold mb-2" for="nickname">
                    Nickname
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="nickname" type="text" placeholder="Joe" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-700 font-bold mb-2" for="gender">
                    Gender
                  </label>
                  <div className="relative">
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="gender">
                      <option disabled selected value> -- Select an option -- </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 md-3 md:mb-0">
                  <label className="block text-gray-700 font-bold mb-2" for="fighting-style">
                    Fighting Style
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="fighting-style" type="text" placeholder="Joe" />
                </div>
                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pr-3 md-3 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" for="height">
                      Height
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="height" type="text" placeholder="Joe" />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label className="block text-gray-700 font-bold mb-2" for="weight">
                      Weight
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="number" type="text" placeholder="Joe" />
                  </div>
                </div>
              </div>
              <div className="form-row flex flex-wrap -mx-3 md-3">
                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pr-3 md-3 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" for="wins">
                      Wins
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="wins" type="number" placeholder="Joe" />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label className="block text-gray-700 font-bold mb-2" for="losses">
                      Losses
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="losses" type="number" placeholder="Joe" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 flex flex-row">
                  <div className="w-full md:w-1/2 pr-3 md-3 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" for="reach">
                      Reach
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="reach" type="text" placeholder="Joe" />
                  </div>
                  <div className="w-full md:w-1/2 pl-3">
                    <label className="block text-gray-700 font-bold mb-2" for="age">
                      Age
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="number" placeholder="Joe" />
                  </div>
                </div>
              </div>
            </div>
            <div className="body-right p-2">
              <p className="block text-gray-700 font-bold mb-2">Profile Photo</p>
              <div className="py-2">
                <img src="https://as2.ftcdn.net/v2/jpg/00/80/88/05/1000_F_80880583_ZfwOjwZ5ydhusUhykU9aiytWNRhJDIWc.jpg" alt="Joe" />
              </div>
              <label className="block text-gray-700 font-bold mb-2" for="about">
                Description
              </label>
              <textarea
                id="about"
                name="about"
                rows={3}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Joe"
                defaultValue={''} />
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}

export default InfoModal