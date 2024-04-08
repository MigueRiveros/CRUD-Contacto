import express from "express"
import userRoutes from "./routes/users.js"
import cors from "cors"

const app = express()

//configuraciones
app.set('port', process.env.PORT || 5000)

//Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use("/", userRoutes)

app.listen(5000)