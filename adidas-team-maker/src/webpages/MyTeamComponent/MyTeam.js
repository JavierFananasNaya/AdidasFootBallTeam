import React, { forwardRef, useState, useImperativeHandle } from "react";

const MyTeam = forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const MaxDef = 4;
  const MaxMid = 4;
  const MaxAtck = 2;
  const MaxGoal = 2;
  const MaxTeamSize = 16;
  const MaxSameTeam = 4;

  const deletePlayerHandler = (player) => {
    let newList = [...playerList];
    let index = newList.findIndex((x) => x.id === player.id);
    newList.splice(index, 1);
    setPlayerList(newList);
  };

  useImperativeHandle(ref, () => ({
    addPlayer(player) {
      setPlayerList((prevList) => {
        let validPlayer = true;
        let auxList = [...prevList];
        
        if (auxList.findIndex((x) => x.id === player.id) !== -1) {
          validPlayer = false;
        } 
        
        //Check  for conditions
        switch (player.position){
          case 'Attacker':
            if ( auxList.filter((x) => x.position === "Attacker").length > (MaxAtck-1) ) {
              console.log('te pasas de atackers')
             validPlayer = false;
            }
            break;
          case 'Goalkeeper':
            if ( auxList.filter((x) => x.position === "Goalkeeper").length > (MaxGoal-1) ) {
              console.log('te pasas de golakeepers')
             validPlayer = false;
            }
            break;
          case 'Defender':
            if ( auxList.filter((x) => x.position === "Defender").length > (MaxDef-1) ) {
              console.log('te pasas de defenders')
             validPlayer = false;
            }
          break;

          case 'Midfielder':
            if ( auxList.filter((x) => x.position === "Midfielder").length > (MaxMid-1) ) {
              console.log('te pasas de midfielders')
             validPlayer = false;
            }
          break;

        }

        if ( auxList.filter((x) => x.teamId === player.teamId).length > (MaxSameTeam-1) ) {
          console.log('te pasas del mismo team')
         validPlayer = false;
        }

        if ( auxList.length + 1 > (MaxTeamSize) ) {
          console.log('te pasas de jugadores')
         validPlayer = false;
        }

        if(validPlayer === true){
          return [...prevList, player];
        }
        else {
          return [...prevList];
        }
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
            <div key={player.id}>
              {player.name} - {player.position}
              <button onClick={() => deletePlayerHandler(player)}>
                Delete from team
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
});

export default MyTeam;
