import React, { useState } from "react";
import './teams.css'
import axios from "axios";
const Team = (props) => {
  const teamId = props.selectedTeam ? props.selectedTeam.id : null;
  const [lastTeamId, setLastTeamId] = useState(-1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamData, setTeamData] = useState(null);


  const addPlayerHandler = (player) => {
    console.log(player);
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
        setTeamData(response.data);
        setIsLoaded(true);
        console.log(response.data);
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
          <h1>Team Details: {teamData.name}</h1>
          <div>
            <ul>
              {teamData.squad?.map((player) => (
                <li key={player.id}>
                  <div className="player-container">
                    <div>{player.name}</div>
                    <button onClick={() => addPlayerHandler(player)}>Add to My Team!</button>
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
    return <div>Select a team</div>;
  }
};
export default Team;