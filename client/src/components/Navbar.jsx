import React from 'react';
import { GiBoxingGlove } from 'react-icons/gi';

const Navbar = () => {
  return (
    <nav className=' bg-transparent text-black'>

      <div>
        <div className='flex'>
          <GiBoxingGlove className='icon1'/>
          <GiBoxingGlove className='icon2'/>
        </div>
        
        <h1>OnlyHands</h1>
      </div>

      <ul>
        <li>Profile</li>
        <li>Rules</li>
        <li>About</li>
      </ul>
    </nav>
  )
}

export default Navbar;