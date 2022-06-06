import React from "react";
import ReactPlayer from "react-player/lazy";

export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <ReactPlayer
        controls={true}
        className="info-game__video"
        url={game.video}
      />
    </div>
  );
}
