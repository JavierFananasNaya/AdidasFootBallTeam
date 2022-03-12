import React, { useState, useRef } from "react";
import Home from "./HomeComponent/home";
import Team from "./TeamComponent/teams";
import MyTeam from "./MyTeamComponent/MyTeam";
import './index.css';

const Webpages = () => {

  const [selectedTeam, setSelectedTeam] = useState(null);

  const selectTeamHandler = (selectedTeamFromList) => {
    setSelectedTeam(selectedTeamFromList);
  };

  const myTeamRef = useRef();

  const selectPlayerHandler = (selectedPlayer) => {
    // ADD LOGIC TO CALL CHILD FUNCTION TO ADD PLAYER
    console.log('Soy padre y he recibido a ', selectedPlayer);
    myTeamRef.current.addPlayer(selectedPlayer);
  };

  return (
    <div className="layout">
      <Home onSelectTeam={selectTeamHandler}></Home>
      <Team selectedTeam={selectedTeam} onSelectPlayer={selectPlayerHandler}></Team>
      <MyTeam ref={myTeamRef}></MyTeam>
    </div>
  );
};
export default Webpages;
