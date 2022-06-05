import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddresApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm({ setshowModal }) {
  const [loading, setloading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      createAddres(formData);
    },
  });

  const createAddres = async (formData) => {
    setloading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddresApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la dirección");
      setloading(false);
    } else {
      formik.resetForm();
      setloading(false);
      setshowModal(false);
    }
    setloading(false);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        value={formik.values.title}
        error={formik.errors.title}
        onChange={formik.handleChange}
        type="text"
        label="Titulo de la dirección"
        placeholder="Titulo de la dirección"
      />

      <Form.Group widths="equal">
        <Form.Input
          name="name"
          value={formik.values.name}
          error={formik.errors.name}
          onChange={formik.handleChange}
          type="text"
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
        />
        <Form.Input
          name="address"
          value={formik.values.address}
          error={formik.errors.address}
          onChange={formik.handleChange}
          type="text"
          label="Dirección"
          placeholder="Dirección"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          value={formik.values.city}
          error={formik.errors.city}
          onChange={formik.handleChange}
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
        />
        <Form.Input
          name="state"
          value={formik.values.state}
          error={formik.errors.state}
          onChange={formik.handleChange}
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
          onChange={formik.handleChange}
          type="text"
          label="Código Postal"
          placeholder="Código Postal"
        />
        <Form.Input
          name="phone"
          value={formik.values.phone}
          error={formik.errors.phone}
          onChange={formik.handleChange}
          type="text"
          label="Número de teléfono"
          placeholder="Número de teléfono"
        />
      </Form.Group>
      <div className="actions">
        <Button loading={loading} className="submit" type="submit">
          Crear dirección
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
