import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const MessageButton = ({ picture, name, online, newMessage}) => { 

    return(
    <div className='w-full h-20 hover:bg-white/10 flex items-center relative cursor-pointer'>

        <div className='relative'>
        <img
            src={picture}
            alt="profile picture"
            className='w-16 h-16 rounded-[50%]'
        />

        {
            online && 
            <div className='absolute top-1/2 translate-y-[-50%] -right-2 animate-pulse'>
            <BsFillCircleFill color='lightGreen'/>
            </div>
        }
        </div>

        <div className='px-5 flex'>
            <div className=' flex flex-col justify-around'>
                <h3 className='text-lg'>{name}</h3>
                {
                newMessage &&
                <p className='text-gray-300 w-32 sm:w-72 overflow-hidden text-ellipsis whitespace-nowrap'>{newMessage.text}</p>
                }
            </div>

            {
                newMessage && 
                <div className='absolute p-1 h-full right-0 top-0 flex flex-col justify-around items-center text-center'>

                <div className=' h-9 w-9 relative'>
                    <BsFillCircleFill color='#ff405b' style={{width: '100%', height: '100%'}}/>
                    <p className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[16px]'>
                        {
                        newMessage?.amount.length > 3 ? '999+' : newMessage.amount
                        }
                    </p>
                </div>
                <p className='text-sm text-start'>{newMessage.date}</p>

                </div>
            }
        </div>

    </div>
    );
}

export default MessageButton;