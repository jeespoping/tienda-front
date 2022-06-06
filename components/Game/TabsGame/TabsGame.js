import React from "react";
import { Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

export default function TabsGame({ game }) {
  const panes = [
    {
      menuItem: "información",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-game" panes={panes} />;
}
