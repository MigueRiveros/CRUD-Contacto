import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (idusuarios) => {
    await axios
      .delete(`http://localhost:5000/`+ idusuarios)
      .then(({ data }) => {
        const newArray = users.filter((users) => users.idusuarios !== idusuarios);
        setUsers(newArray);
        toast.success(data);
        console.log("eliminado correctamente")
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };
  console.log("/////////////",users)
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Icono</Th>
          <Th>Nombre</Th>
          <Th>Gmail</Th>
          <Th>Telefono</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          //console.log("ESTA ES LA IMAGEN***************",item.image),
          <Tr key={i}>
            <Td width="30%">
              <a href={item.image} target="_blank" rel="noopener noreferrer">
                <img src={require("/Users/nugue/OneDrive/Desktop/crud/api/images/"+item.image)} style={{width:"150px"}}/>
              </a>
            </Td>
            <Td width="30%">{item.name}</Td>
            <Td width="30%">{item.gmail}</Td>
            <Td width="20%">{item.telefono} </Td>
            <Td width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td width="5%">
              <FaTrash onClick={() => handleDelete(item.idusuarios)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
