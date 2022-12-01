import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";

const Card = () => {
  const [matches, setMatches] = useState([]);

  // generate new people to swipe on
  const doServe = () => {
    fetch("https://only-hands.herokuapp.com/api/match/serve", {
      method: 'GET',
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          console.log("serve: ", data["matches"]);
          // current issue: populating matches 
          data["matches"].map(function(match) {
            // console.log(match);
            setMatches(matches => [...matches, match]);
          });
          console.log("served people : ", matches.map(function(match) {
            console.log("this match is in the state: ", match)
          }));
          console.log("num of matches is", matches.length);
        } else console.log(data["message"]);
      })
  }

  useEffect(() => {
    doServe();
  }, [])

  //Load all matches at page load
  useEffect(() => {
    fetch("https://only-hands.herokuapp.com/api/match/", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          console.log(data["matches"]);
        } else {
          console.log(data["message"]);
        }
      })
      .catch((error) => console.log(error));
  }, [])

  const [currentIndex, setCurrentIndex] = useState(matches.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(matches.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, index) => {
    setLastDirection(direction);

    // Handle swipe direction actions

    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < matches.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div className="fighterCard flex flex-col justify-center items-center h-screen">
      <div className="cardContainer bg-gray">
        {matches.length === 0 ? (<div className="flex justify-center items-center">Nobody to serve lol</div>) :
          (matches.length > 0) && matches.map((match, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={index}
              preventSwipe={['up', 'down']}
              onSwipe={(dir) => swiped(dir, index)}
              onCardLeftScreen={() => outOfFrame(match.firstName, index)}
            >
              <div
                // style={{ backgroundImage: "url(" + match.url + ")" }}
                style={{ backgroundColor: "gray"}}
                className="card"
              >
                <div className="gridContainer">
                  <div className="item1">{match["firstName"]}{" "}{match["lastName"]}</div>
                  <div className="gridItem">Gender: {match["gender"]}</div>
                  <div className="gridItem">Nickname: {match["nickname"]}</div>
                  <div className="gridItem">Age: {match["age"]}</div>
                  <div className="gridItem">Height: {match["height"]}</div>
                  <div className="gridItem">Weight: {match["weight"]}</div>
                  <div className="gridItem">Style: {match["style"]}</div>
                  <div className="gridItem">Record: {match["record"]}</div>
                  <div className="gridItem">Reach: {match["reach"]}</div>
                </div>
              </div>
            </TinderCard>
          ))
        }
      </div>
        <div className="buttons">
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("left")}
          >
            Swipe left!
          </button>
          <button
            style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
            onClick={() => swipe("right")}
          >
            Swipe right!
          </button>
          {lastDirection ? (
            <h2 key={lastDirection} className="infoText">
              You swiped {lastDirection}
            </h2>
          ) : (
            <h2 className="infoText">
              Swipe or get swiped on b#@?% !
            </h2>
          )}
        </div>
    </div>
  );
};

export default Card;
