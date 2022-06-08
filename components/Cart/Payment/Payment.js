import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_TOKEN } from "../../../utils/constants";

const stripPromise = loadStripe(STRIPE_TOKEN);

export default function Payment({ products, address }) {
  return (
    <div className="payment">
      <div className="title">Pago</div>
      <div className="data">
        <Elements stripe={stripPromise}>
          <p>Formulario de pago</p>
        </Elements>
      </div>
    </div>
  );
}
