import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { getLastGamesApi } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";

export default function Home() {
  const [games, setGames] = useState(null);
  console.log(games);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50);
      if (size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <h1>Estamos en home</h1>
    </BasicLayout>
  );
}
