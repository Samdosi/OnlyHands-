import React from 'react';
import Card from './Card';

const SearchBar = ({ value, setValue }) => {

  return (
    <div className=' w-full h-[15%] min-h-[120px] relative pt-5'>

        <h1 className='text-lg md:text-xl text-[#ff405b]'>Search Chats</h1>

        <input
            value={value}
            onChange={e => setValue(e.target.value)}
            className='w-[90%] p-2 my-2 h-12 bg-[#2c2c2c] outline-none focus:shadow-md rounded border focus:border-2 border-gray-900'
            type="text" 
        />

    </div>
  )
}

export default SearchBar;