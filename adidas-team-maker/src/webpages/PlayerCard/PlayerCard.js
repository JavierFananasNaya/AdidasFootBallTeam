import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './PlayerCard.scss';

const PlayerCard = (props) => {
  const type = props.type;
  const player = props.player;

  const addPlayerHandler = (player, type) => {
    props.onSelectPlayer(player, type);
  };

  if(type==='player'){

    return (
    <div className="player-container">
      <div className="player-name">
        <img alt={player.player.name} className="player-photo" src={player.player.photo}></img>
        <div>
          <span>{player.player.name} </span>
        </div>
        <div>
          <span className="player-position">
            {player.statistics[0].games.position}
          </span>
        </div>
      </div>
      <button onClick={() => addPlayerHandler(player, "player")}>
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>
  );
}else{
    return (
        <div className="player-container coach">
          <div className="player-name">
            <img alt={player.name} className="player-photo" src={player.photo}></img>
            <div>
              <span>{player.name} </span>
            </div>
            <div>
              <span className="player-position">COACH</span>
            </div>
          </div>
          <button onClick={() => addPlayerHandler(player, 'coach')}>
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
    )
}
};

export default PlayerCard;
