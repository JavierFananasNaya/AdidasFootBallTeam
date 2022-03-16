import axios from "axios";
import React, { useState, useEffect } from "react";
import "./TeamSelector.scss";

const TeamSelector = (props) => {
  const selectTeamHandler = (team) => {
    props.onSelectTeam(team);
  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/teams",
    };

    axios
      .request(options)
      .then((response) => {
        setTeams(response.data.response);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);
  if (isLoaded && !error) {
    return (
      <div>
      <div className="team-list">
        <ul>
          {teams.map((team) => (
            <li key={team.team.id}>
              <button
                className="team-button"
                onClick={() => selectTeamHandler(team.team)}
                key={team.team.id}
                >
                <div className="team-list-element">
                  <img className="team-logo" src={team.team.logo} alt="Logo" />
                  <div className="team-name">{team.team.name}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
  } else if (!isLoaded && !error) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  } else if (error) {
    return <h2> Error: {error.message}</h2>;
  }
};
export default TeamSelector;
