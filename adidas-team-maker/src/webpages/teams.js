import React, { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Team = (props) => {
  let { id } = useParams();
  var myInit = {
    method: "GET",
    headers: { "X-Auth-Token": "b686dd9575fb4b4cb29967e7f26a60d0" },
    mode: "cors",
    dataType: "json",
    cache: "default",
  };
  var teamPlayersRequest = new Request(`https://api.football-data.org/v2/teams/${id}`, myInit);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch(teamPlayersRequest)
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          console.log(data);
          setPlayers(data.squad);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  console.log(id);
  if (isLoaded && !error) {
    return (
      <div>
        <h1>Team Details: {id}</h1>
        <div>
          <ul>
            {players.map((team) => (
              <li key={team.id}>
                <Link to={`team/${team.id}`}>{team.name}</Link>
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
};
export default Team;
