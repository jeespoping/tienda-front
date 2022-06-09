import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function Order({ order }) {
  const { addressShipping, createdAt, game, totalPayment } = order;
  const { title, poster, url } = game;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment} €</p>
            </div>
          </div>
        </div>
        <div className="order__other">
          <p className="order__other-date">
            {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
          </p>
          <Icon name="eye" circular link onClick={() => setShowModal(true)} />
        </div>
      </div>
      <AddressModal
        title={title}
        addressShipping={addressShipping}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

function AddressModal({ title, addressShipping, showModal, setShowModal }) {
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente direccion</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {addressShipping.state}, {addressShipping.city}{" "}
          {addressShipping.postalCode}
        </p>
        <p>{addressShipping.phone}</p>
      </div>
    </BasicModal>
  );
}
