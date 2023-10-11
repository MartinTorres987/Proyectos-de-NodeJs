import express from "express";
import indexrouter from "./v1/routes/index.route"

const app = express();

// Rutas
app.use('/api/v1', indexrouter)

export default app;