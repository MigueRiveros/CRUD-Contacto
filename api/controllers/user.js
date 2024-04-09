import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`name`, `gmail`, `telefono`, `fecha_nacimiento`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.gmail,
    req.body.telefono,
    req.body.fecha_nacimiento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuario creado con exito.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `name` = ?, `gmail` = ?, `telefono` = ?, `fecha_nacimiento` = ? WHERE `idusuarios` = ?";

  const values = [
    req.body.name,
    req.body.gmail,
    req.body.telefono,
    req.body.fecha_nacimiento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    
    return res.status(200).json("Usuario actualizado con exito.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `idusuarios` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuario eliminado con exito.");
  });
};
