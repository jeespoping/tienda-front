import {
  Container,
  Menu as Menuweb,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column width={10} className="menu__right">
            <MenuOptions />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function MenuPlatforms() {
  return (
    <Menuweb>
      <Link href="/play-station">
        <Menuweb.Item as="a">PlayStation</Menuweb.Item>
      </Link>
      <Link href="/xbox">
        <Menuweb.Item as="a">Xbox</Menuweb.Item>
      </Link>
      <Link href="/switch">
        <Menuweb.Item as="a">Switch</Menuweb.Item>
      </Link>
    </Menuweb>
  );
}

function MenuOptions() {
  return (
    <Menuweb.Item>
      <Icon name="user outline" />
      Mi cuenta
    </Menuweb.Item>
  );
}
