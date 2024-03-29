import React from "react";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
} from "../../utils/breakpoints";

export default function ListGames(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game key={game.id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game(props) {
  const { game } = props;

  return (
    <Grid.Column className="list-games__game">
      <a>
        <div className="list-games__game-poster">
          <Link href={`/${game.url}`}>
            <Image as="a" src={game.poster.url} alt={game.title} />
          </Link>
          <div className="list-games__game-poster-info">
            {game.discount ? (
              <span className="discount">-{game.discount}%</span>
            ) : (
              <span />
            )}
            <span className="price">{game.price}€</span>
          </div>
        </div>
        <h2>{game.title}</h2>
      </a>
    </Grid.Column>
  );
}
