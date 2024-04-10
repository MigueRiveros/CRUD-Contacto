import { db } from "../db.js";
import multer from "multer";
import path from "path";

const __dirname = path.resolve();

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileUpload = multer({
  storage: diskStorage // Configurar multer para usar diskStorage
}).single('image');

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al obtener los usuarios de la base de datos' });

    // Mapea los resultados para incluir la URL de la imagen si está presente
    const usersWithImageURL = data.map(user => {
      // Verifica si el usuario tiene una imagen asociada
      if (user.image) {
        user.imageURL = `http://localhost:5000/api/images/${user.image}`;
      }
      return user;
    });

    return res.status(200).json(usersWithImageURL);
  });
};

export const addUser = (req, res) => {
  fileUpload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error al subir la imagen' });
    }
    
    const q =
      "INSERT INTO usuarios(`name`, `gmail`, `telefono`, `fecha_nacimiento`, `image`) VALUES(?, ?, ?, ?, ?)";

    const values = [
      req.body.name,
      req.body.gmail,
      req.body.telefono,
      req.body.fecha_nacimiento,
      req.file ?req.file.filename: null
    ];

    db.query(q, values, (err) => {
      if (err) return res.status(500).json({ message: 'Error al agregar el usuario a la base de datos' });

      return res.status(200).json({ message: 'Usuario creado con éxito.' });
    });
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
