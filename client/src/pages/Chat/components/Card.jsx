import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const Card = ({ picture, name, online }) => {
  return (
    <div className='flex flex-col p-1 mx-5 relative cursor-pointer '>
      <div className='w-16 h-16 '>
        <img src={picture} alt={name + ' profile'} className='rounded-lg w-full h-full '/>
      </div>
        <h3 className=' w-[4.25rem] overflow-hidden text-ellipsis whitespace-nowrap'>{name}</h3>
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