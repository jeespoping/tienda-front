import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function ChangeNameForm({ user }) {
  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellidos</h4>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            value={user.name}
            name="name"
            placeholder="Tu nuevo nombre"
          />
          <Form.Input
            value={user.lastname}
            name="lastname"
            placeholder="Tus nuevos apelllidos"
          />
        </Form.Group>
        <Button className="submit">Actualizar</Button>
      </Form>
    </div>
  );
}
