import React, { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyTeam.scss";

const MyTeam = forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const MaxDef = 4;
  const MaxMid = 4;
  const MaxAtck = 2;
  const MaxGoal = 2;
  const MaxTeamSize = 16;
  const MaxSameTeam = 4;

  useEffect(() => {
    if(localStorage.getItem('myTeam')){
      setPlayerList(JSON.parse(localStorage.getItem('myTeam')));
    }
  })
  
  const saveTeamHandler = () => {
    if( localStorage.getItem('myTeam')){
      localStorage.removeItem('myTeam');
    }
    localStorage.setItem('myTeam', JSON.stringify(playerList));
  };

  const deletePlayerHandler = (player) => {
    let newList = [...playerList];
    let index = newList.findIndex((x) => x.id === player.id);
    newList.splice(index, 1);
    setPlayerList(newList);
  };

  useImperativeHandle(ref, () => ({
    addPlayer(player) {
      setPlayerList((prevList) => {
        let validPlayer = true;
        let auxList = [...prevList];

        if (auxList.findIndex((x) => x.id === player.id) !== -1) {
          validPlayer = false;
        }

        //Check  for conditions
        switch (player.position) {
          case "Attacker":
            if (
              auxList.filter((x) => x.position === "Attacker").length >
              MaxAtck - 1
            ) {
              console.log("te pasas de atackers");
              validPlayer = false;
            }
            break;
          case "Goalkeeper":
            if (
              auxList.filter((x) => x.position === "Goalkeeper").length >
              MaxGoal - 1
            ) {
              console.log("te pasas de golakeepers");
              validPlayer = false;
            }
            break;
          case "Defender":
            if (
              auxList.filter((x) => x.position === "Defender").length >
              MaxDef - 1
            ) {
              console.log("te pasas de defenders");
              validPlayer = false;
            }
            break;

          case "Midfielder":
            if (
              auxList.filter((x) => x.position === "Midfielder").length >
              MaxMid - 1
            ) {
              console.log("te pasas de midfielders");
              validPlayer = false;
            }
            break;
        }

        if (
          auxList.filter((x) => x.teamId === player.teamId).length >
          MaxSameTeam - 1
        ) {
          console.log("te pasas del mismo team");
          validPlayer = false;
        }

        if (auxList.length + 1 > MaxTeamSize) {
          console.log("te pasas de jugadores");
          validPlayer = false;
        }

        if (validPlayer === true) {
          return [...prevList, player];
        } else {
          return [...prevList];
        }
      });
    },
  }));

  if (playerList.length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="myteam-list-container">
        <h1 className="title">Your Adidas team!:</h1>
        <ul className="player-list">
          {playerList.map((player) => (
            <div className="player-container" key={player.id}>
              <div className="player-name">
                <span>{player.name} </span>
                <span className="player-position">{player.position}</span>
              </div>
              <button
                className="delete-button"
                onClick={() => deletePlayerHandler(player)}
              >
                <FontAwesomeIcon icon="minus" />
              </button>
            </div>
          ))}
        </ul>
        <div className="button-container">
          <button onClick={() => saveTeamHandler()}>Save Your Team!</button>
        </div>
      </div>
    );
  }
});

export default MyTeam;
