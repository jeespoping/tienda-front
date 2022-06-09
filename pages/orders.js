import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import { getOrdersApi } from "../api/order";
import Order from "../components/Orders/Order";

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
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavia no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList({ orders }) {
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column key={order._id} mobile={16} table={6} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
