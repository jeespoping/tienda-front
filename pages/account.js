import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePassword from "../components/Account/ChangePassword";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePassword user={user} logout={logout} />
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setshowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);

  const openModal = (title) => {
    setTitleModal(title);
    setFormModal(<AddressForm setshowModal={setshowModal} />);
    setshowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva direccón")} />
      </div>
      <div className="data">Lista de direcciones</div>

      <BasicModal show={showModal} setShow={setshowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
