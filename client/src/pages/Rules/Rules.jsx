import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Rules = ({setBgImage}) => {
    const { pathname } = useLocation();
    setBgImage(pathname);

  return (
    <div className='bg-white text-center w-fit p-6 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded'>
      <h1 className='font-bold text-4xl m-7'>OnlyHands Rules!</h1>
      <h2 className='text-xl'>
        <strong>The first rule of OnlyHands is:</strong> you do not talk about OnlyHands. <br/><br/> <strong>The second rule of OnlyHands is:</strong> you DO NOT talk about OnlyHands! <br/><br/> <strong>Third rule of OnlyHands:</strong> if someone yells “stop!”, goes limp, or taps out, the fight is over. <br/><br/> <strong>Fourth rule:</strong> only two guys to a fight. <br/><br/> <strong>Fifth rule:</strong> one fight at a time, fellas. <br/><br/> <strong>Sixth rule:</strong> the fights are bare knuckle. No shirt, no shoes, no weapons. <br/><br/> <strong>Seventh rule:</strong> fights will go on as long as they have to. <br/><br/> <strong>And the eighth and final rule:</strong> if this is your first time on OnlyHands, you have to fight.
      </h2>       
    </div>
  )
}

export default Rules