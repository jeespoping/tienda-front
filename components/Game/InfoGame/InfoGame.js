import React from "react";
import ReactPlayer from "react-player/lazy";
import CarrouselScreenshots from "../CarrouselScreenshots/CarrouselScreenshots";

export default function InfoGame({ game }) {
  return (
    <div className="info-game">
      <ReactPlayer
        controls={true}
        className="info-game__video"
        url={game.video}
      />
      <CarrouselScreenshots title={game.title} screenshots={game.screenshots} />
    </div>
  );
}
