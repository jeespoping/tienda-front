import Head from "next/head";
import { Button } from "semantic-ui-react";

export default function Home() {
  return (
    <div className="home">
      <h1>Estamos en N3xt Js</h1>
      <Button primary>Primary</Button>
      <Button secondary>Secondary</Button>
    </div>
  );
}
