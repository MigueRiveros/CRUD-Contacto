import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.name.value = onEdit.name;
      user.gmail.value = onEdit.gmail;
      user.telefono.value = onEdit.telefono;
      user.fecha_nacimiento.value = onEdit.fecha_nacimiento;

      console.log(user.gmail.value);
      console.log(user.telefono.value);
      console.log(user.fecha_nacimiento.value);
      console.log(user.name.value);

    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.gmail.value ||
      !user.telefono.value ||
      !user.fecha_nacimiento.value
    ) {
      return toast.warn("Complete todos los campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:5000/" + onEdit.idusuarios, {
          name: user.name.value,
          gmail: user.gmail.value,
          telefono: user.telefono.value,
          fecha_nacimiento: user.fecha_nacimiento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
      console.log('gmail cambiado', user.gmail.value);
      console.log('telefono cambiado', user.telefono.value);
      console.log('fecha cambiado', user.fecha_nacimiento.value);
      console.log('nombre cambiado', user.name.value);
      getUsers();
    } else {
      await axios
        .post("http://localhost:5000", {
          name: user.name.value,
          gmail: user.gmail.value,
          telefono: user.telefono.value,
          fecha_nacimiento: user.fecha_nacimiento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.name.value = "";
    user.gmail.value = "";
    user.telefono.value = "";
    user.fecha_nacimiento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nombre</Label>
        <Input name="name" />
      </InputArea>
      <InputArea>
        <Label>Gmail</Label>
        <Input name="gmail" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefono</Label>
        <Input name="telefono" />
      </InputArea>
      <InputArea>
        <Label>Fecha de Nacimiento</Label>
        <Input name="fecha_nacimiento" type="date" />
      </InputArea>

      <Button type="submit">Guardar</Button>
    </FormContainer>
  );
};

export default Form;
