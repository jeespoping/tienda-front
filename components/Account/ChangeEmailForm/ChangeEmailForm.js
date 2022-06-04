import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>(Tu e-email acutal: {user.email} </span>
      </h4>

      <Form>
        <Form.Group widths="equal">
          <Form.Input name="email" placeholder="Tu numero e-mail" />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
          />
        </Form.Group>
        <Button className="submit">Actualizar</Button>
      </Form>
    </div>
  );
}
