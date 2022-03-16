import React, { useState, useRef } from "react";
import TeamSelector from "./HomeComponent/TeamSelector";
import Team from "./TeamComponent/team";
import MyTeam from "./MyTeamComponent/MyTeam";
import './index.scss';

const Webpages = () => {

  const [selectedTeam, setSelectedTeam] = useState(null);

  const selectTeamHandler = (selectedTeamFromList) => {
    setSelectedTeam(selectedTeamFromList);
  };

  const myTeamRef = useRef();

  const selectPlayerHandler = (selectedPlayer, type) => {
    myTeamRef.current.addPlayer(selectedPlayer, type);
  };

  return (
    <div className="layout">
      <TeamSelector id="teamSelector" onSelectTeam={selectTeamHandler}></TeamSelector>
      <Team id="squadSelector" selectedTeam={selectedTeam} onSelectPlayer={selectPlayerHandler}></Team>
      <MyTeam id="myTeam" ref={myTeamRef}></MyTeam>
    </div>
  );
};
export default Webpages;
