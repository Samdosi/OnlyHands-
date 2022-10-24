import React from 'react';
import { GiBoxingGlove } from 'react-icons/gi';

const Navbar = () => {
  return (
    <nav className='flex bg-transparent text-white'>

      <div>
        <div className='flex'>
          <GiBoxingGlove className='icon1'/>
          <GiBoxingGlove className='icon2'/>
          <h1>OnlyHands</h1>
        </div>
        
      </div>

      <ul className='flex'>
        <li>Profile</li>
        <li>Rules</li>
        <li>About</li>
      </ul>
    </nav>
  )
}

export default Navbar;