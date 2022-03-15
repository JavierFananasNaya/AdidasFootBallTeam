import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./teams.scss";

const Team = (props) => {
  const teamId = props.selectedTeam ? props.selectedTeam.id : null;
  const [lastTeamId, setLastTeamId] = useState(-1);
  const [error, setError] = useState(null);
  const [isPlayersLoaded, setIsPlayersLoaded] = useState(false);
  const [isCoachLoaded, setIsCoachLoaded] = useState(false);
  const [teamData, setTeamData] = useState({coach: null, players: []});

  const addPlayerHandler = (player, type) => {
    props.onSelectPlayer(player, type);
  };

  if (teamId && teamId !== lastTeamId) {
    setLastTeamId(teamId);

    const options = {
      method: "GET",
      url: "http://localhost:8000/teamInfo",
      params: { id: teamId },
    };

    const coachOptions = {
      method: "GET",
      url: "http://localhost:8000/coach",
      params: { id: teamId },
    };

    axios
      .request(options)
      .then((response) => {
        // Adding team id to player properties
        response.data.response.map(function (player) {
          player.player.teamId = teamId;
          return player;
        });
        setTeamData((prevTeam) => {
          return {coach: prevTeam.coach, players: response.data.response}
        })
        setIsPlayersLoaded(true);
      })
      .catch((error) => {
        setIsPlayersLoaded(true);
        setError(error);
      });


      axios
      .request(coachOptions)
      .then((response) => {
        setTeamData((prevTeam) => {
          return {coach: response.data.response[0], players: prevTeam.players}
        })
        setIsCoachLoaded(true);
      })
      .catch((error) => {
        setIsCoachLoaded(true);
        setError(error);
      });
  }

  if (teamId) {
    if (isPlayersLoaded && !error) {
      return (
        <div>
          <div className="player-list-container">
            <div className="header">
              <img src={teamData.players[0]?.statistics[0].team.logo}></img>
              <h1 className="title">{teamData.players[0]?.statistics[0].team.name}</h1>
            </div>
            <ul>
              {teamData.coach &&
              <li key={teamData.coach.id}>
                <div className="player-container coach">
                  <div className="player-name">
                    <img className="player-photo" src={teamData.coach.photo}></img>
                    <span>{teamData.coach.name} </span>
                    <span className="player-position">COACH</span>
                  </div>
                  <button onClick={() => addPlayerHandler(teamData.coach, 'coach')}>
                    <FontAwesomeIcon icon="plus" />
                  </button>
                </div>
              </li>
              }
              {teamData.players?.map((player) => (
                <li key={player.player.id}>
                  <div className="player-container">
                    <div className="player-name">
                      <img className="player-photo" src={player.player.photo}></img>
                      <span>{player.player.name} </span>
                      <span className="player-position">{player.statistics[0].games.position}</span>
                    </div>
                    <button onClick={() => addPlayerHandler(player, 'player')}>
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (!isPlayersLoaded && !error) {
      return <h2> LOADING TEAM</h2>;
    } else if (error) {
      return <h2> Error: {error.message}</h2>;
    }
  } else {
    return(
      <div className="player-list-container">
        <div>Select a team to load its info</div>
      </div> 
      )
  }
};
export default Team;
