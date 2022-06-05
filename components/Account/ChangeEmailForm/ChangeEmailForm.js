import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el email");
      } else {
        setReloadUser(true);
        toast.success("Email actualizado");
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Cambia tu e-mail <span>(Tu e-email acutal: {user.email} </span>
      </h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            value={formik.values.email}
            error={formik.errors.email}
            onChange={formik.handleChange}
            name="email"
            placeholder="Tu nuevo e-mail"
          />
          <Form.Input
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
            onChange={formik.handleChange}
            name="repeatEmail"
            placeholder="Confirma tu nuevo e-mail"
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
    email: "",
    repeatEmail: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("repeatEmail")], true),
    repeatEmail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
}
