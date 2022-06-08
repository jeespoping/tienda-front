import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { toast } from "react-toastify";
import { paymentCartApi } from "../../../../api/cart";

export default function FormPayment({ address, products }) {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const { auth, logout } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );
      if (size(response) > 0) {
        toast.success("PEdido completado");
      } else {
        toast.error("Error al realizar el pedido");
      }
    }

    setLoading(false);
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button disabled={!stripe} loading={loading} type="submit">
        Pagar
      </Button>
    </form>
  );
}
