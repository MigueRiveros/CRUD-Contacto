import axios from "axios";
import React, { useEffect, useRef,useState } from "react";
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
      return toast.warn("¡Complete todos los campos!");
    }
  
    if (!file) {
      return toast.warn("¡Debe cargar una imagen!");
    }
  
    const formdata = new FormData();
    formdata.append('image', file);
    formdata.append('name', user.name.value);
    formdata.append('gmail', user.gmail.value);
    formdata.append('telefono', user.telefono.value);
    formdata.append('fecha_nacimiento', user.fecha_nacimiento.value);
  
    try {
      let url = "http://localhost:5000";
      if (onEdit) {
        url += `/${onEdit.idusuarios}`;
      }
  
      const response = await fetch(url, {
        method: onEdit ? 'PUT' : 'POST',
        body: formdata
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
  
      const data = await response.json();
  
      if (onEdit) {
        toast.success("Usuario actualizado con éxito.");
      } else {
        toast.success("Usuario creado con éxito.");
      }
  
      user.name.value = "";
      user.gmail.value = "";
      user.telefono.value = "";
      user.fecha_nacimiento.value = "";
  
      setOnEdit(null);
      setFile(null);
      document.getElementById('fileinput').value = null;
      getUsers();
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error al procesar la solicitud.");
    }
  };

  const [file, setFile] = useState(null)

  const selectedHandler = e => {
    setFile(e.target.files[0])
  } 


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit} >
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
        <div>
        <label>Subir Icono</label>
        <input id="fileinput" onChange={selectedHandler} name="form-control" type="file" />
        </div>
    </FormContainer>
  );
};

export default Form;
