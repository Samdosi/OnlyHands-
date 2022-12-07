import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { AiOutlineHeart, AiOutlineClose} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IoMaleFemaleOutline, IoMaleOutline, IoFemaleOutline } from 'react-icons/io5';
import { useToastyContext } from '../../../context/ToastyContext';
import { useNavigate } from 'react-router-dom';

const NewCard = ({ avatars }) => {

    const cookies = new Cookies();
    const notify = useToastyContext();
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [animateClass, setAnimateClass] = useState('');
    const noMoreCards = useRef(false);
    const currentCard = useRef();

    const doServe = async () => {
        console.log('DO SERVE')
        fetch("https://only-hands.herokuapp.com/api/match/serve", {
          method: "GET",
          headers: {
            "x-access-token": cookies.get("token"),
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if(res.status === 401 || res.status === 403)
                navigate('/');
            return res.json();
          })
          .then((data) => {
            if (data["success"]) {
                currentCard.current = (data.matches.length > 0) ? data.matches.length - 1 : null;
                noMoreCards.current = (data.matches.length > 0) ? false : true;
              setMatches((prevMatches) => [...prevMatches, ...data["matches"]]);
            } 
            else{
                console.log(data.message);
                notify(data.message, "warn");
            };
          })
          .catch(e => {
            console.log(e);
            notify(e.message, "error");
        })
    };

    const doMatch = (isMatch, swipedMatch) => {
        fetch("https://only-hands.herokuapp.com/api/match/", {
          method: "POST",
          headers: {
            "x-access-token": cookies.get("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            match: isMatch,
            profileID: swipedMatch,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data["success"]) {
              console.log(data["message"]);
    
              if (data["message"] === "Match Completed Successfully!") {
                notify("You have matched!", 'success');
              }
            } else console.log(data["message"]);
          });
      };

    const handleClick = (type, id, i) => {
        currentCard.current = i - 1;
        let match;
        if(type === 'nope'){
            setAnimateClass('no');
            match = false;
        }
        else{
            setAnimateClass('yes');
            match = true;
        }

        doMatch(match, id);
        setMatches(matches.slice(0,matches.length - 1));

        if(matches.length <= 1 && !noMoreCards.current)
            doServe();
    }

    useEffect(() =>{
        doServe();
    }, [])

  return (

    <div className='w-full max-w-[400px] h-full relative'>

        {
            noMoreCards.current &&
            <div className='bg-gradient-to-b from-[#323232] to-black py-20 rounded-md shadow-md w-full h-3/4'>
                <h2 className='text-white text-xl font-semibold text-center'>
                    You have swiped through all possible opponents!
                </h2>
            </div>
        }

        {
            matches?.map((c, i) => {
                return(
                    <div className={'absolute top-10 w-full h-full newCard ' + ((currentCard.current !== i) ? "" : animateClass)}>
                        <div className='bg-gradient-to-b from-[#323232] to-black rounded-md shadow-md w-full h-3/4'>
                            <div className='w-full h-1/4 flex justify-center items-center'>
                                {
                                    c.image
                                    ?
                                        <img
                                            src={avatars[parseInt(c.image, 10)]}
                                            alt="avatar"
                                            className='rounded-full w-[7rem] h-[7rem]'
                                        />
                                    :
                                    <CgProfile size={100} color='white' />
                                }
                            </div>

                            <div className='text-white h-3/4 flex-col justify-around text-center'>
                
                                <div>
                                    <h3 className='font-semibold text-xl justify-center items-center flex'>
                                        {`${c.firstName} ${c.lastName}`}
                                        <span className='px-1'>
                                            {
                                                c.gender === 'male'
                                                ?
                                                    <IoMaleOutline color='#01A6EA' />
                                                :
                                                    c.gender === 'female'
                                                    ?
                                                        <IoFemaleOutline />
                                                    :
                                                        <IoMaleFemaleOutline />
                                            }
                                        </span>
                                    </h3>
                                    <h4>"{c.nickname}"</h4>
                                </div>
                
                                <div className='flex font-normal justify-around items-center w-full h-3/4'>
                                    <div className='flex flex-col h-full justify-around'>
                                        <p><span className='font-semibold'>Age:</span> {c.age}</p>
                                        <p><span className='font-semibold'>Height:</span> {c.height}</p>
                                        <p><span className='font-semibold'>Weight:</span> {c.weight}</p>
                
                                    </div>
                                    <div className='flex flex-col h-full justify-around'>
                                        <p><span className='font-semibold'>Style:</span> {c.style}</p>
                                        <p><span className='font-semibold'>Record:</span> {`${c.wins}-${c.losses}-${c.KOs}`}</p>
                                        <p><span className='font-semibold'>Reach:</span> {c.reach}</p>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
            
                        <div className='flex w-full justify-around my-10'>
                            <button
                                onClick={() => handleClick('nope', c._id, i)}                                
                            >
                                <AiOutlineClose color='red' size={40} />
                            </button>
                            <button
                                onClick={() => handleClick('yay', c._id, i)}
                            >
                                <AiOutlineHeart color='lightGreen' size={40} />
                            </button>
                        </div>
                    </div>
                )
            })
        }
    </div>
        
  )
}

export default NewCard;