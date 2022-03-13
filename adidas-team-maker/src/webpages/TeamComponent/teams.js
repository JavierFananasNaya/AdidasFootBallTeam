import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./teams.scss";

const Team = (props) => {
  const teamId = props.selectedTeam ? props.selectedTeam.id : null;
  const [lastTeamId, setLastTeamId] = useState(-1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamData, setTeamData] = useState(null);

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
        response.data.squad.map(function (player) {
          player.teamId = teamId;
          return player;
        });
        setTeamData(response.data);
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
            <h1 className="title">{teamData.name}</h1>
            <ul>
              {teamData.squad?.map((player) => (
                <li key={player.id}>
                  <div className="player-container">
                    <div className="player-name">
                      <span>{player.name} </span>
                      <span className="player-position">{player.position}</span>
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
