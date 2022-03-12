import React  from "react";

const MyTeam = ({ myTeamAddPlayer }) => {
  React.useEffect(() => {
    myTeamAddPlayer.current = alertUser;
  }, []);

  function alertUser() {
    alert("You clicked!");
  }
  return <div>My Adidas dreamteam!:</div>;
};

export default MyTeam;
