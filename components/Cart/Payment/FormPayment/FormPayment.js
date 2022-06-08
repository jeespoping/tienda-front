import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { toast } from "react-toastify";

export default function FormPayment({ address, products }) {
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  const stripe = useStripe();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      console.log(result);
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
