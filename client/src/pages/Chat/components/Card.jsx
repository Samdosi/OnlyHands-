import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const Card = ({ picture, name, online }) => {
  return (
    <div className='flex flex-col p-1 mx-5 relative cursor-pointer'>
      <div className='w-20 h-20 md:w-24 md:h-24 '>
        <img src={picture} alt={name + ' profile'} className='rounded-lg w-full h-full '/>
      </div>
        <h3>{name}</h3>
        {
          online &&
          <div className='absolute top-1/4 -right-1 animate-pulse'>
            <BsFillCircleFill color='lightGreen'/>
          </div>
        }
    </div>
  )
}

export default Card;