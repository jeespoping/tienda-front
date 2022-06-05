import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePassowrdApi } from "../../../api/user";

export default function ChangePassword({ user, logout }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePassowrdApi(
        user.id,
        formData.password,
        logout
      );
      if (!response) {
        toast.error("Error al actualizar la contraseña");
      } else {
        logout();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password">
      <h4>Cambiar tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.password}
            error={formik.errors.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            placeholder="Tu nueva contraseña"
          />
          <Form.Input
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            onChange={formik.handleChange}
            name="repeatPassword"
            type="password"
            placeholder="Confirma tu nueva contraseña"
          />
        </Form.Group>
        <Button loading={loading} className="submit">
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
