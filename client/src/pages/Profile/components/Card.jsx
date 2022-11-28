import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";

const Card = () => {
  const db = [
    {
      name: "Richard Hendricks",
      url: "https://d1qxviojg2h5lt.cloudfront.net/images/01DVE8XQTBZY43FEMZQ3Q97XGT/middleditch.valley570.webp",
    },
    {
      name: "Erlich Bachman",
      url: "https://pyxis.nymag.com/v1/imgs/de0/2c7/f20dde2c4980b2a4cc88051d8499258b13-30-5-tjmiller.rsquare.w700.jpg",
    },
    {
      name: "Monica Hall",
      url: "https://s1.r29static.com/bin/entry/006/x,80/1945796/image.jpg",
    },
    {
      name: "Jared Dunn",
      url: "https://pyxis.nymag.com/v1/imgs/0ec/bd7/26cc6a63add60ce42a3b2aacdd63f43fde-15-jared-silicon-valley.rsquare.w700.jpg",
    },
    {
      name: "Dinesh Chugtai",
      url: "https://www.indiewire.com/wp-content/uploads/2021/10/Kumail-Nanjiani.jpg",
    },
  ];

  const [matches, setMatches] = useState([]);

  // generate new people to swipe on
  const doServe = async event => {
    
    event.preventDefault();

    fetch("https://only-hands.herokuapp.com/api/match/serve", {
      method: 'GET',
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["success"]) {
          console.log(data["message"]);
        } else console.log(data["message"]);
      })
  }

  // Load all matches at page load
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
          console.log(data["message"]);
          setMatches([...data["matches"]]);
        } else {
          console.log(data["message"]);
        }
      })
      .catch((error) => console.log(error));
  }, [])

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
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
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="fighterCard flex flex-col justify-center items-center h-screen">
      <div className="cardContainer">
        {db.map((match, index) => (
          <TinderCard
            className="swipe"
            key={match["name"]}
            onSwipe={(dir) => swiped(dir, match.name, index)}
            onCardLeftScreen={() => outOfFrame(match.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + match.url + ")" }}
              className="card"
            >
              <div className="gridContainer">
                <div className="item1">Fighters </div>
                <div className="gridItem">Gender: </div>
                <div className="gridItem">Nickname: </div>
                <div className="gridItem">Height: </div>
                <div className="gridItem">Style: </div>
                <div className="gridItem">Weight: </div>
                <div className="gridItem">Record: </div>
                <div className="gridItem">D.O.B: </div>
                <div className="gridItem">Reach: </div>
              </div>
            </div>
          </TinderCard>
        ))}
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
            Swipe a card or press a button to get Restore Card button visible!
          </h2>
        )}
      </div>
    </div>
  );
};

export default Card;
