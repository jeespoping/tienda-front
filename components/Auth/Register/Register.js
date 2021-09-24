import { Form, Button } from "semantic-ui-react";

export default function Register({ showLoginForm }) {
  return (
    <Form className="login-form">
      <Form.Input name="name" type="text" placeholder="Nombre" />
      <Form.Input name="lastname" type="text" placeholder="Apellidos" />
      <Form.Input name="username" type="text" placeholder="Nombre de usuario" />
      <Form.Input name="email" type="text" placeholder="Correo electronico" />
      <Form.Input name="password" type="password" placeholder="Contraseña" />

      <div className="actions">
        <Button type="button">Iniciar sesion</Button>
        <Button className="submit" type="submit">
          Registrar
        </Button>
      </div>
    </Form>
  );
}
