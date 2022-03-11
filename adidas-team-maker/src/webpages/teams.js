import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Team = (props) => {
  const teamId = props.selectedTeam ? props.selectedTeam.id : null;
  const [lastTeamId, setLastTeamId] = useState(-1);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamData, setTeamData] = useState(null);

  var myInit = {
    method: "GET",
    headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY },
    dataType: "json",
    cache: "default",
  };
  console.log(teamId, lastTeamId);

  if (teamId && teamId !== lastTeamId) {
    setLastTeamId(teamId);
    console.log("AAAAAAAAAAAA");
    var teamPlayersRequest = new Request(
      `https://api.football-data.org/v2/teams/${teamId}`,
      myInit
    );
    fetch(teamPlayersRequest)
      .then((res) => res.json())
      .then(
        (data) => {
          setTeamData(data);
          setIsLoaded(true);
          setError(null);
          console.log(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  if (teamId) {
    if (isLoaded && !error) {
      return (
        <div>
          <h1>Team Details: {teamData.name}</h1>
          <div>
            <ul>
              {teamData.squad?.map((team) => (
                <li key={team.id}>
                  <div>{team.name}</div>
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
