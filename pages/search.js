import React, { useState, useEffect } from "react";
import { searchGamesApi } from "../api/game";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { size } from "lodash";

export default function search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query);
        console.log(response);
      } else {
        setGames([]);
      }
    })();
  }, [query]);

  return <BasicLayout className={search}>search</BasicLayout>;
}
