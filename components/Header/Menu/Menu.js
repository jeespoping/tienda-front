import { Container, Menu as Menuweb, Grid, Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import { useState, useEffect } from "react";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms />
          </Grid.Column>
          <Grid.Column width={10} className="menu__right">
            {auth ? (
              <button onClick={logout}>Cerrar sesión</button>
            ) : (
              <MenuOptions onShowModal={onShowModal} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        size="small"
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
      >
        <Auth setTitleModal={setTitleModal} onCloseModal={onCloseModal} />
      </BasicModal>
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

function MenuOptions({ onShowModal }) {
  return (
    <Menuweb>
      <Menuweb.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Mi cuenta
      </Menuweb.Item>
    </Menuweb>
  );
}
