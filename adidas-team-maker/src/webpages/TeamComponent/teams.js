import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./teams.scss";

const Team = (props) => {
  const teamId = props.selectedTeam ? props.selectedTeam.id : null;
  const [lastTeamId, setLastTeamId] = useState(-1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamData, setTeamData] = useState({coach: null, players: []});

  const addPlayerHandler = (player) => {
    props.onSelectPlayer(player);
  };

  if (teamId && teamId !== lastTeamId) {
    setLastTeamId(teamId);

    const options = {
      method: "GET",
      url: "http://localhost:8000/teamInfo",
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
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }

  if (teamId) {
    if (isLoaded && !error) {
      return (
        <div>
          <div className="player-list-container">
            <div className="header">
              <img src={teamData.players[0]?.statistics[0].team.logo}></img>
              <h1 className="title">{teamData.players[0]?.statistics[0].team.name}</h1>
            </div>
            <ul>
              {teamData.players?.map((player) => (
                <li key={player.player.id}>
                  <div className="player-container">
                    <div className="player-name">
                      <img className="player-photo" src={player.player.photo}></img>
                      <span>{player.player.name} </span>
                      <span className="player-position">{player.statistics[0].games.position}</span>
                    </div>
                    <button onClick={() => addPlayerHandler(player)}>
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (!isLoaded && !error) {
      return <h2> LOADING TEAM</h2>;
    } else if (error) {
      return <h2> Error: {error.message}</h2>;
    }
  } else {
    return <div></div>;
  }
};
export default Team;
