import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";
import { fileURLToPath } from 'url'; // Importa la función fileURLToPath para convertir URLs en rutas de archivo
import { dirname, join } from 'path'; // Importa dirname y join de path

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // Obtiene el directorio padre del archivo actual

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 5000);

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Ruta para servir archivos estáticos desde la carpeta 'images' 
const directorioImagenes = join(__dirname, 'images');
app.use('/api/images', express.static(directorioImagenes));

// Rutas de usuario
app.use("/", userRoutes);

// Inicia el servidor
const PORT = app.get('port');
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
