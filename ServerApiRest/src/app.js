import express from "express";
import indexrouter from "./v1/routes/index.routes"
import carrers from './v1/routes/careers.routes'
import cors from "cors";

const app = express();

// utils
app.use(cors())
app.use(express.json())
// Rutas
app.use(indexrouter);
app.use('/api/v1', carrers);

export default app;