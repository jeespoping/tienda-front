import React, { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import { addFavoriteApi, isFavoriteApi } from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";

export default function HeaderGame({ game }) {
  const { poster, title } = game;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info({ game }) {
  const { title, summary, price, discount } = game;
  const [isFavorites, setIsFavorites] = useState(false);
  const [reloadFavorite, setreloadFavorite] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game.id, logout);
      if (size(response) > 0) setIsFavorites(true);
      else setIsFavorites(false);
    })();
    setreloadFavorite(false);
  }, [game, reloadFavorite]);

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, game.id, logout);
      setreloadFavorite(true);
    }
  };

  const deleteFavorite = () => {
    console.log("Eliminar de favorito");
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          onClick={isFavorites ? deleteFavorite : addFavorite}
          className={classNames({
            like: isFavorites,
          })}
          name={isFavorites ? "heart" : "heart outline"}
          link
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: {price}€</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>{(price - Math.floor(price * discount) / 100).toFixed(2)}€</p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
}
