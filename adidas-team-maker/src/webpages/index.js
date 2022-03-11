import { useState, React } from "react";
import Home from "./home";
import Team from "./teams";
import './index.css';

const Webpages = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const selectTeamHandler = (selectedTeamFromList) => {
    setSelectedTeam(selectedTeamFromList);
    
  };
  return (
    <div className="layout">
      <Home onSelectTeam={selectTeamHandler}></Home>
      <Team selectedTeam={selectedTeam}></Team>
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
