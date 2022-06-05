import React, { useState, useEffect } from "react";
import BasicLayagout from "../../layouts/BasicLayout";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { getGamesPlatformApi, getTotalGamesPlatformApi } from "../../api/game";
import ListGames from "../../components/ListGames";

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(null);

  const getStartItem = () => {
    const currentPages = parseInt(query.page);
    if (!query.page || currentPages === 1) return 0;
    else return 6;
  };

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

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform);
      setTotalGames(response);
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
