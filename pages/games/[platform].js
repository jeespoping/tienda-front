import React, { useState, useEffect } from "react";
import BasicLayagout from "../../layouts/BasicLayout";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { getGamesPlatformApi } from "../../api/game";
import ListGames from "../../components/ListGames";

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(
          query.platform,
          limitPerPage,
          0
        );
        setGames(response);
      }
    })();
  }, [query]);

  return (
    <BasicLayagout className="platform">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay Juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayagout>
  );
}
