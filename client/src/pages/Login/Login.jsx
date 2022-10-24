import React from 'react';
import { useLocation } from 'react-router-dom';

const Login = ({ setBgImage }) => {

  const {pathname} = useLocation();
  setBgImage(pathname);

  return (
    <div className='text-white'>
      Login
    </div>
  )
}

export default Login;