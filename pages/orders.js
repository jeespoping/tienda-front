import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getOrdersApi } from "../api/order";

export default function orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
        <div className="title">Mis Pedidos</div>
        <div className="data"></div>
      </div>
    </BasicLayout>
  );
}
