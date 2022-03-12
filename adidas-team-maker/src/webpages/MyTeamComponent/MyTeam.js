import React, { forwardRef, useState, useImperativeHandle } from "react";

const MyTeam = forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);

  useImperativeHandle(ref, () => ({
    addPlayer(player) {
      setPlayerList((prevList) => {
        return [...prevList, player];
      });
    },
  }));
  if (playerList.length === 0) {
    return <div></div>;
  } else {
    return (
      <div>
        <div>My Adidas dreamteam!:</div>
        <ul className="player-list">
          {playerList.map((player) => (
            <div key={player.id}>{player.name}</div>
          ))}
        </ul>
      </div>
    );
  }
  //   React.useEffect(() => {
  //     myTeamAddPlayer.current = alertUser;
  //   }, []);

  //   function alertUser() {
  //     alert("You clicked!");
  //   }
  //   return <div>My Adidas dreamteam!:</div>;
});

export default MyTeam;
