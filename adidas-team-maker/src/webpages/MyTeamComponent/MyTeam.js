import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyTeam.scss";

import logo from "../../resources/logos/adidas_logo_400.png";

const MyTeam = forwardRef((props, ref) => {
  const [myTeam, setMyTeam] = useState({ coach: null, players: [] });
  const [auxPlayerList, setAuxPlayerList] = useState([]);
  const [teamValid, setTeamValid] = useState(true);
  const [auxValid, setAuxValid] = useState(true);
  const MinGoalK = 2;
  const MinDef = 4;
  const MinMid = 4;
  const MinAtck = 2;
  const MaxTeamSize = 16;
  const MaxSameTeam = 4;

  const checkTeamValid = (teamToCheck) => {
    let isValid = true;
    let auxList = [...teamToCheck.players];

    if (!teamToCheck.coach && auxList.length === 0) {
      isValid = true;
    } else {
      if (!teamToCheck.coach) {
        isValid = false;
      }

      if (
        auxList.filter((x) => x.statistics[0].games.position === "Goalkeeper")
          .length < MinGoalK
      ) {
        isValid = false;
      }

      if (
        auxList.filter((x) => x.statistics[0].games.position === "Defender")
          .length < MinDef
      ) {
        isValid = false;
      }

      if (
        auxList.filter((x) => x.statistics[0].games.position === "Midfielder")
          .length < MinMid
      ) {
        isValid = false;
      }

      if (
        auxList.filter((x) => x.statistics[0].games.position === "Attacker")
          .length < MinAtck
      ) {
        isValid = false;
      }
    }
    if (isValid !== auxValid) {
      setAuxValid(isValid);
      setTeamValid(isValid);
    }
  };

  checkTeamValid(myTeam);

  useEffect(() => {
    if (localStorage.getItem("myTeam") && auxPlayerList.length === 0) {
      setAuxPlayerList(JSON.parse(localStorage.getItem("myTeam")));
      setMyTeam(JSON.parse(localStorage.getItem("myTeam")));
      setTeamValid(true);
    }
  });

  const saveTeamHandler = () => {
    if (localStorage.getItem("myTeam")) {
      localStorage.removeItem("myTeam");
    }
    localStorage.setItem("myTeam", JSON.stringify(myTeam));
    alert(`Your team has been saved with ${myTeam.players.length} players!`)
  };

  const deletePlayerHandler = (player, type) => {
    switch (type) {
      case "coach":
        setMyTeam((prevTeam) => {
          return { coach: null, players: prevTeam.players };
        });
        break;
      case "player":
        let newList = [...myTeam.players];
        let index = newList.findIndex((x) => x.player.id === player.player.id);
        newList.splice(index, 1);
        setMyTeam((prevTeam) => {
          return { coach: prevTeam.coach, players: newList };
        });
        break;

      default:
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    addPlayer(player, type) {
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

            if (
              validPlayer &&
              auxList.filter((x) => x.player.teamId === player.player.teamId)
                .length >
                MaxSameTeam - 1
            ) {
              alert("You can't add more than 4 players from the same team.");
              validPlayer = false;
            }

            if (auxList.length + 1 > MaxTeamSize) {
              alert("You can't add more than 16 players to your.");
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
                players: [...prevTeam.players],
              };
            }
          });
          break;
      }
    },
  }));

  if (myTeam.players?.length === 0 && !myTeam.coach) {
    return (
      <div className="myteam-list-container">
        <div className="my-team-header">
          <div className="button-container">
            {teamValid && (
              <button
                className="save-team-button"
                onClick={() => saveTeamHandler()}
              >
                <FontAwesomeIcon icon="save" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="myteam-list-container">
        <div className="my-team-header">
          <img alt="logo" src={logo} />
          <h1 className="title">Your Adidas team!:</h1>
          <div className="button-container">
            {teamValid && (
              <button
                className="save-team-button"
                onClick={() => saveTeamHandler()}
              >
                <FontAwesomeIcon icon="save" />
              </button>
            )}
          </div>
        </div>
        <ul className="player-list">
          {myTeam.coach && (
            <li key={myTeam.coach.id}>
              <div className="player-container coach">
                <div className="player-name">
                  <img
                    alt="myTeam.coach.name"
                    className="player-photo"
                    src={myTeam.coach.photo}
                  ></img>
                  <div>
                    <span>{myTeam.coach.name} </span>
                  </div>
                  <div>
                    <span className="player-position">COACH</span>
                  </div>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deletePlayerHandler(myTeam.coach, "coach")}
                >
                  <FontAwesomeIcon icon="minus" />
                </button>
              </div>
            </li>
          )}
          {myTeam.players.map((player) => (
            <li key={player.player.id}>
              <div className="player-container" key={player.player.id}>
                <div className="player-name">
                  <img
                    alt={player.player.name}
                    className="player-photo"
                    src={player.player.photo}
                  ></img>
                  <div>
                    <span>{player.player.name} </span>
                  </div>
                  <div>
                    <span className="player-position">
                      {player.statistics[0].games.position}
                    </span>
                  </div>
                  <img
                    alt={player.statistics[0].team.name}
                    className="team-logo"
                    src={player.statistics[0].team.logo}
                  />
                </div>
                <button
                  className="delete-button"
                  onClick={() => deletePlayerHandler(player, "player")}
                >
                  <FontAwesomeIcon icon="minus" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
});

export default MyTeam;
