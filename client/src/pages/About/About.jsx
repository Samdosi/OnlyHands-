import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const About = ({setBgImage}) => {
    const { pathname } = useLocation();
    setBgImage(pathname);

  return (
    <div className='bg-white text-center w-fit p-6 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded'>
      <h1 className='font-bold'>About Us</h1>
      <h2 className='text-center'>
          We are a group of mixed martial arts enthusiasts who wanted to better connect the
          fighting community. Instead of limiting yourself to sparring partners from your
          regular gyms, we wanted to expand our experience by sparring local fighters of
          many different locations and fighting styles to better expand our experience and
          build up better fighters in the process to create a new wave of elite MMA fighters.
          <br></br><br></br>
          The project originally began as a project for a class but quickly became a passion project 
          as we got further into the process and began inviting users.
          <br></br><br></br>
          -JRDLJJSKJ</h2>
    </div>
  )
}

export default About