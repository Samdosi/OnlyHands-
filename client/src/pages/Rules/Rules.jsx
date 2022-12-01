import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Rules = ({setBgImage}) => {
    const { pathname } = useLocation();
    setBgImage(pathname);

  return (
    <div className='bg-white text-center w-fit p-6 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded'>
        <h1 className='font-bold'>Rules</h1>
        <h2 className='justify-center'>1- Don't talk about OnlyHands.<br></br>
        2- No Street Fights. Standard fighting rules apply.<br></br>
        3- Unbiased referee required for every fight.
        </h2>
        </div>
  )
}

export default Rules