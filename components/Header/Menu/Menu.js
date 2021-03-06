import {
  Container,
  Menu as Menuweb,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import { map } from "lodash";
import { useState, useEffect } from "react";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

export default function Menu() {
  const [platForms, setplatForms] = useState([]);
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

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setplatForms(response || []);
    })();
  }, []);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column width={6} className="menu__left">
            <MenuPlatforms platforms={platForms} />
          </Grid.Column>
          <Grid.Column width={10} className="menu__right">
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
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

function MenuPlatforms({ platforms }) {
  return (
    <Menuweb>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <Menuweb.Item as="a" name={platform.url}>
            {platform.title}
          </Menuweb.Item>
        </Link>
      ))}
    </Menuweb>
  );
}

function MenuOptions({ onShowModal, user, logout }) {
  const { productsCart } = useCart();
  return (
    <Menuweb>
      {user ? (
        <>
          <Link href="/orders">
            <Menuweb.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menuweb.Item>
          </Link>

          <Link href="/wishlist">
            <Menuweb.Item as="a">
              <Icon name="heart outline" />
              Wishlist
            </Menuweb.Item>
          </Link>

          <Link href="/account">
            <Menuweb.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menuweb.Item>
          </Link>

          <Link href="/cart">
            <Menuweb.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menuweb.Item>
          </Link>

          <Menuweb.Item className="m-0" onClick={logout}>
            <Icon name="power off" />
          </Menuweb.Item>
        </>
      ) : (
        <Menuweb.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menuweb.Item>
      )}
    </Menuweb>
  );
}
