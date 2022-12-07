import React from 'react';
import { useLocation } from 'react-router-dom';
import Jadyn from './Members/jadyn.png';
import Josef from './Members/josef.png';
import Joseph from './Members/joseph.png';
import Leith from './Members/leith.png';
import James from './Members/james.png';
import Konstantin from './Members/konstantin.png';
import Sam from './Members/sam.png';
import Daniela from './Members/dani.png';
import Rex from './Members/rex.png';

const About = ({ setBgImage }) => {
  const { pathname } = useLocation();
  setBgImage(pathname);

  return (
    <div className="flex h-5/6 justify-center items-center">
      <div className="rounded w-full px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gradient-to-l from-[#323232] to-black">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-4xl font-semibold tracking-wider rounded-full text-white">
              MEET THE TEAM
            </p>
          </div>
          <p className="text-base md:text-xl text-white">
            We are a group of mixed martial arts enthusiasts who want to <br/> better connect the fighting community. 
          </p>
        </div>
        <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Joseph}
              alt="Joseph"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Joseph Maria</p>
              <p className="text-md">Project Manager</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={James}
              alt="James"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">James Nguyen</p>
              <p className="text-md">Frontend Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Jadyn}
              alt="Jadyn"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Jadyn LaPace</p>
              <p className="text-md">Frontend Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Rex}
              alt="Rex"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Rex Bianchi</p>
              <p className="text-md">Backend Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Daniela}
              alt="Daniela"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Daniela Ostos Rivas</p>
              <p className="text-md">Backend Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Leith}
              alt="Leith"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Leith Rabah</p>
              <p className="text-md">Backend Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Josef}
              alt="Josef"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Josef Vodicka</p>
              <p className="text-md">Mobile Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Sam}
              alt="Sam"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Sam Dosi</p>
              <p className="text-md">Mobile Developer</p>
            </div>
          </div>
          <div className="flex">
            <img
              className="object-cover w-20 h-20 mr-4 rounded-full shadow"
              src={Konstantin}
              alt="Konstantin"
            />
            <div className="flex flex-col justify-center text-white">
              <p className="text-xl font-bold">Konstantin Clonce</p>
              <p className="text-md">Mobile Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About