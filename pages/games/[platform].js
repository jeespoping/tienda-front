import React, { useState, useEffect } from "react";
import BasicLayagout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGamesPlatformApi } from "../../api/game";

const limitPerPage = 10;

export default function Platform() {
  const { query } = useRouter();
  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGamesPlatformApi(
        query.platform,
        limitPerPage,
        0
      );
      setGames(response);
    })();
  }, [query]);

  return (
    <BasicLayagout className="platform">
      <h1>Estamos en la plataforma : {query.platform}</h1>
    </BasicLayagout>
  );
}
