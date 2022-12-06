import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import Cookies from "universal-cookie";

const Card = () => {
  // const matches = [];
  const [matches, setMatches] = useState({ data: [] });
  const [match, setMatch] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(matches["data"].length - 1);
  const [lastDirection, setLastDirection] = useState();
  const cookies = new Cookies();

  // generate new people to swipe on
  const doServe = async () => {
    fetch("https://only-hands.herokuapp.com/api/match/serve", {
      method: "GET",
      headers: {
        // "x-access-token": sessionStorage.getItem("token"),
        "x-access-token": cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          // console.log("serve: ", data["matches"]);
          setMatches((prevMatches) => ({
            data: [...prevMatches["data"], ...data["matches"]],
          }));

          console.log("setmatches!");
          console.log(matches["data"]);
        } else console.log(data["message"]);
      });
  };

  // does matching between profiles
  const doMatch = (isMatch, swipedMatch) => {
    fetch("https://only-hands.herokuapp.com/api/match/", {
      method: "POST",
      headers: {
        // "x-access-token": sessionStorage.getItem("token"),
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
          
          if(data["message"] === "") {
            // toast
          }
        } else console.log(data["message"]);
      });
  };

  //Load all matches at page load
  useEffect(() => {
    fetch("https://only-hands.herokuapp.com/api/match/", {
      method: "GET",
      headers: {
        // "x-access-token": sessionStorage.getItem("token"),
        "x-access-token": cookies.get("token"),
        "Content-Type": "application/json",
      },
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

    doServe();
  }, []);

  useEffect(() => {
    updateCurrentIndex(matches["data"].length - 1);
  }, [matches]);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () => 
      Array(matches["data"].length)
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
  const swiped = (direction, id, index) => {
    setLastDirection(direction);

    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (id) => {
    // console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();

    // Handle swipe direction actions
    if (lastDirection === "left") {
      doMatch(false, id);
    } else if (lastDirection === "right") {
      doMatch(true, id);
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < matches["data"].length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div className="fighterCard flex flex-col items-center h-screen">
      <div className="cardContainer bg-gray">
        {matches["data"].length === 0 ? (
          <div className="flex justify-center items-center text-white">
            Nobody wants that smoke
          </div>
        ) : (
          matches["data"].length > 0 &&
          matches["data"].map((match, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={index}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, match._id, index)}
                onCardLeftScreen={() => outOfFrame(match._id)}
                flickOnSwipe={true}

              >
                <div
                  // style={{ backgroundImage: "url(" + match.url + ")" }}
                  style={{ backgroundColor: "grey" }}
                  className="card"
                >
                  <div className="gridContainer">
                    <div className="item1">
                      {match["firstName"]} {match["lastName"]}
                    </div>
                    <div className="gridItem">Gender: {match["gender"]}</div>
                    <div className="gridItem">
                      Nickname: {match["nickname"]}
                    </div>
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
        )}  
      </div>
       <div className="buttons">
         <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          // onClick={() => swipe("left")}
          onClick={() => outOfFrame(match._id)}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          // onClick={() => swipe("right")}
          onClick={() => outOfFrame(match._id)}
        >
          Swipe right!
        </button>
        {lastDirection ? (
          <h2 key={lastDirection} className="infoText">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="infoText">Swipe or get swiped on!</h2>
        )}
       </div>
    </div>
  );
};

export default Card;
