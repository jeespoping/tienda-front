import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping({ setAddress }) {
  const [addresses, setetAddresses] = useState(null);
  const [addressActivate, setAddressActivate] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setetAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Dirección de envió</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay niguna direccion creada{" "}
            <Link href="/account">
              <a>añadir tu primera dirección.</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  setAddress={setAddress}
                  setAddressActivate={setAddressActivate}
                  addressActivate={addressActivate}
                  address={address}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address({ address, setAddress, setAddressActivate, addressActivate }) {
  const changeAddress = () => {
    setAddressActivate(address._id);
    setAddress(address);
  };
  return (
    <div
      className={classNames("address", {
        active: addressActivate == address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
