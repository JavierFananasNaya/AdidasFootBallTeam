import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  var myInit = {
    method: "GET",
    headers: { "X-Auth-Token": "b686dd9575fb4b4cb29967e7f26a60d0" },
    mode: "cors",
    dataType: "json",
    cache: "default",
  };
  var myRequest = new Request("https://api.football-data.org/v2/teams", myInit);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch(myRequest)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          console.log(data);
          setTeams(data.teams);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (isLoaded && !error) {
    return (
      <div>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>
              <Link to={`team/${team.id}`}>{team.name}</Link>
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
