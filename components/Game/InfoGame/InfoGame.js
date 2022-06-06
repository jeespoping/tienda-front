import React from "react";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import "moment/locale/es";
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
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game.releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
