import React, { useState } from "react";
import Home from "./HomeComponent/home";
import Team from "./TeamComponent/teams";
import MyTeam from "./MyTeamComponent/MyTeam";
import './index.css';

const Webpages = () => {

  const [selectedTeam, setSelectedTeam] = useState(null);

  const selectTeamHandler = (selectedTeamFromList) => {
    setSelectedTeam(selectedTeamFromList);
  };

  const myTeamAddPlayer = React.useRef(null)

  const selectPlayerHandler = (selectedPlayer) => {
    // ADD LOGIC TO CALL CHILD FUNCTION TO ADD PLAYER
    console.log('Soy padre y he recibido a ', selectedPlayer);
    myTeamAddPlayer.current()
  };

  return (
    <div className="layout">
      <Home onSelectTeam={selectTeamHandler}></Home>
      <Team selectedTeam={selectedTeam} onSelectPlayer={selectPlayerHandler}></Team>
      <MyTeam myTeamAddPlayer={myTeamAddPlayer}></MyTeam>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team/:id" element={<Team />} />
        </Routes>
      </Router> */}
    </div>
  );
};
export default Webpages;
