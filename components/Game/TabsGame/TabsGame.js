import React from "react";
import { Tab } from "semantic-ui-react";

export default function TabsGame({ game }) {
  const panes = [
    {
      menuItem: "información",
      render: () => (
        <Tab.Pane>
          <h1>Info Game</h1>
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-game" panes={panes} />;
}
