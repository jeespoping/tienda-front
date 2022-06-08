import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";

export default function FormPayment({ address, products }) {
  const handleSubmit = (event) => {
    event.preventDefault;
    console.log("Realizando pago..");
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit">Pagar</Button>
    </form>
  );
}
