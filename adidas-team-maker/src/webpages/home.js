import axios from "axios";
import React, { useState, useEffect } from "react";
import "./home.css";

const Home = (props) => {
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
        setIsLoaded(true);
        console.log(response);
        setTeams(response.data.teams);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);
  if (isLoaded && !error) {
    return (
      <div className="team-list">
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <button onClick={() => selectTeamHandler(team)} key={team.id}>
                <div className="team-list-element">
                  <img className="team-logo" src={team.crestUrl} alt="Logo" />
                  <span>{team.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (!isLoaded && !error) {
    return <h2> LOADING</h2>;
  } else if (error) {
    return <h2> Error: {error.message}</h2>;
  }
};
export default Home;
