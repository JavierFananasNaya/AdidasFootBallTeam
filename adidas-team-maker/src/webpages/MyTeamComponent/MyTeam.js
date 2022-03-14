import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyTeam.scss";

const MyTeam = forwardRef((props, ref) => {
  const [myTeam, setMyTeam] = useState({ coach: null, players: [] });
  // const [playerList, setPlayerList] = useState([]);
  const [auxPlayerList, setAuxPlayerList] = useState([]);
  const MaxDef = 4;
  const MaxMid = 4;
  const MaxAtck = 2;
  const MaxGoal = 2;
  const MaxTeamSize = 16;
  const MaxSameTeam = 4;

  useEffect(() => {
    if (localStorage.getItem("myTeam") && auxPlayerList.length === 0) {
      setAuxPlayerList(JSON.parse(localStorage.getItem("myTeam")));
      setMyTeam(JSON.parse(localStorage.getItem("myTeam")));
    }
  });

  const saveTeamHandler = () => {
    if (localStorage.getItem("myTeam")) {
      localStorage.removeItem("myTeam");
    }
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
  };

  const deletePlayerHandler = (player) => {
    let newList = [...myTeam.players];
    let index = newList.findIndex((x) => x.player.id === player.player.id);
    newList.splice(index, 1);
    setMyTeam((prevTeam) => {
      return { coach: prevTeam.coach, players: newList };
    });
    // setPlayerList(newList);
  };

  useImperativeHandle(ref, () => ({
    addPlayer(player, type) {
      console.log(player, type);
      switch (type) {
        case "coach":
          setMyTeam((prevTeam) => {
            return { coach: player, players: prevTeam.players };
          });
          break;

        case "player":
          setMyTeam((prevTeam) => {
            let validPlayer = true;
            let auxList = [...prevTeam.players];

            if (
              auxList.findIndex((x) => x.player.id === player.player.id) !== -1
            ) {
              validPlayer = false;
            }

            //Check  for conditions
            switch (player.statistics[0].games.position) {
              case "Attacker":
                if (
                  auxList.filter(
                    (x) => x.statistics[0].games.position === "Attacker"
                  ).length >
                  MaxAtck - 1
                ) {
                  console.log("te pasas de atackers");
                  validPlayer = false;
                }
                break;
              case "Goalkeeper":
                if (
                  auxList.filter(
                    (x) => x.statistics[0].games.position === "Goalkeeper"
                  ).length >
                  MaxGoal - 1
                ) {
                  console.log("te pasas de golakeepers");
                  validPlayer = false;
                }
                break;
              case "Defender":
                if (
                  auxList.filter(
                    (x) => x.statistics[0].games.position === "Defender"
                  ).length >
                  MaxDef - 1
                ) {
                  console.log("te pasas de defenders");
                  validPlayer = false;
                }
                break;

              case "Midfielder":
                if (
                  auxList.filter(
                    (x) => x.statistics[0].games.position === "Midfielder"
                  ).length >
                  MaxMid - 1
                ) {
                  console.log("te pasas de midfielders");
                  validPlayer = false;
                }
                break;
            }

            if (
              auxList.filter((x) => x.player.teamId === player.player.teamId)
                .length >
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
              return {
                coach: prevTeam.coach,
                players: [...prevTeam.players, player],
              };
            } else {
              return {
                coach: prevTeam.coach,
                players: [...prevTeam.players]
              }
            }
          });
          break;
      }
    },
  }));

  if (myTeam.players?.length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="myteam-list-container">
        <h1 className="title">Your Adidas team!:</h1>
        <ul className="player-list">
          {myTeam.coach && (
            <li key={myTeam.coach.id}>
              <div className="player-container coach">
                <div className="player-name">
                  <img className="player-photo" src={myTeam.coach.photo}></img>
                  <span>{myTeam.coach.name} </span>
                  <span className="player-position">COACH</span>
                </div>
                <button
                  onClick={() => deletePlayerHandler(myTeam.coach, "coach")}
                >
                  <FontAwesomeIcon icon="plus" />
                </button>
              </div>
            </li>
          )}
          {myTeam.players.map((player) => (
            <li key={player.player.id}>
              <div className="player-container" key={player.player.id}>
                <div className="player-name">
                  <img className="player-photo" src={player.player.photo}></img>
                  <span>{player.player.name} </span>
                  <span className="player-position">
                    {player.statistics[0].games.position}
                  </span>
                  <img
                    className="team-logo"
                    src={player.statistics[0].team.logo}
                  ></img>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deletePlayerHandler(player)}
                >
                  <FontAwesomeIcon icon="minus" />
                </button>
              </div>
            </li>
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
