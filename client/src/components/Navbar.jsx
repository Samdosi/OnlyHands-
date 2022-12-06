import React, { useState } from 'react';
import { useOutsideClick } from '../hooks';
import { Sling as Hamburger } from 'hamburger-react';
import { GiBoxingGlove } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const cookies = new Cookies();

  const hamburgerRef = useOutsideClick(() => {
    handleLinkClicked();
  });

  const handleLinkClicked = () => {
    setToggleHamburger(false);
    setToggleMenu(false)
  }

  const handleLogout = () => {
    handleLinkClicked();
    cookies.remove("profile");
    cookies.remove("token");
  }

  const linksClass = 'hover:bg-gray-200 md:hover:bg-transparent md:hover:text-gray-200 rounded pl-4 py-3 pr-28 md:p-0 text-lg';

  const links = [
    <>
      {cookies.get("token") && <li
        className='w-fit h-fit'
        onClick={handleLogout}
      >
        <Link className={linksClass} to="/profile">Opponents</Link>
      </li>}
      {cookies.get("token") && <li
        className='w-fit h-fit'
        onClick={handleLinkClicked}
      >
        <Link className={linksClass} to='/chat'>Chat</Link>
      </li>}
      {cookies.get("token") == null && <li
        className='w-fit h-fit'
        onClick={handleLinkClicked}
      >
        <Link className={linksClass} to='/about'>About</Link>
      </li>}
      {cookies.get("token") == null && <li
        className='w-fit h-fit'
        onClick={handleLinkClicked}
      >
        <Link className={linksClass} to='/rules'>Rules</Link>
      </li>}
      {cookies.get("token") && <li
        className='w-fit h-fit'
        onClick={handleLogout}
      >
        <Link className={linksClass} to="/">Logout</Link>
      </li>}
    </>
  ]

  return (
    <>
      <nav className='min-h-[10%] h-[10%] max-h-[10%] bg-transparent text-white flex justify-between items-center relative shadow-lg'>
        <Link to={cookies.get("token") ? "/profile" : "/"}>
          <div className='flex items-center text-center lg:py-5'>
            <div className='flex h-11 w-11 xsm:h-14 xsm:w-14 lg:h-14 lg:w-14'>
              <GiBoxingGlove className='icon1 mr-1' style={{ width: '100%', height: '100%' }} />
              <GiBoxingGlove className='icon2' style={{ width: '100%', height: '100%' }} />
            </div>

            <h1 className='text-xl xsm:text-2xl lg:text-3xl font-medium ml-2'>OnlyHands</h1>

          </div>
        </Link>

        <u className='hidden md:flex justify-between lg:justify-around text-white w-1/3 no-underline list-none font-medium '>
          {links}
        </u>
        <div ref={hamburgerRef} className=' z-10 absolute top-1/2 translate-y-[-50%] right-0 md:hidden'>
          <div className='z-10 relative top-0 right-0'>
            <Hamburger
              color={toggleHamburger ? 'black' : 'white'}
              toggled={toggleHamburger}
              toggle={setToggleHamburger}
              size={25}
              duration={0.7}
              onToggle={toggled => {
                if (toggled) {
                  setToggleMenu(true);
                }
                else {
                  handleLinkClicked();
                }
              }}
            />
          </div>
          {toggleMenu &&
            <u className='bg-white flex flex-col justify-around text-black p-10 w-64 h-64 absolute z-[5] top-1 right-0 no-underline list-none rounded-md shadow-lg font-medium '>
              {links}
            </u>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar;