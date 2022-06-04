import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user.name, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formdata) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formdata, logout);
      if (!response) {
        toast.error("Error al actualizar el nomre y apellidos");
      } else {
        setReloadUser(true);
        console.log("Nombre actualizado");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
            name="name"
            placeholder="Tu nuevo nombre"
          />
          <Form.Input
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
            name="lastname"
            placeholder="Tus nuevos apelllidos"
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(name, lastname) {
  return {
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
