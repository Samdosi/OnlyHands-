import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Rules = ({setBgImage}) => {
    const { pathname } = useLocation();
    setBgImage(pathname);

  return (
    <div className='bg-white text-center w-fit p-6 absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 rounded'>
      <h1 className='font-bold text-4xl m-7'>OnlyHands Rules!</h1>
      <h2 className='text-xl'>
        <strong>1. </strong> You do not talk about OnlyHands. <br/><br/> <strong>2. </strong> You <u>DO NOT</u> talk about OnlyHands! <br/><br/> <strong>3. </strong> If someone yells “Stop!”, goes limp, or taps out, the fight is over. <br/><br/> <strong>4. </strong> Only two people to a fight. <br/><br/> <strong>5. </strong> One fight at a time. <br/><br/> <strong>6. </strong> The fights are bare knuckle. No shirt, no shoes, no weapons. <br/><br/> <strong>7. </strong> Fights will go on as long as they have to. <br/><br/> <strong>Finally: </strong> If this is your first time on OnlyHands, you have to fight.
      </h2>       
    </div>
  )
}

export default Rules