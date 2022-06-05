import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import { deleteAddressApi, getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ListAddress({
  reloadAddress,
  setReloadAddress,
  openModal,
}) {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddress(false);
    })();
  }, [reloadAddress]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna direccón creada</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddress={setReloadAddress}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address({ address, logout, setReloadAddress, openModal }) {
  const [loading, setLoading] = useState(false);

  const deleteAddress = async () => {
    setLoading(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setReloadAddress(true);
    setLoading(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          onClick={() => openModal(`Editar : ${address.title}`, address)}
          primary
        >
          Editar
        </Button>
        <Button loading={loading} onClick={deleteAddress}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
