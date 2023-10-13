import express from "express";
import indexrouter from "./routes/index.routes"
import carrersRouter from './routes/careers.routes'
import authRouter from './routes/auth.routes'
import cors from "cors";

const app = express();

// utils
app.use(cors())
app.use(express.json())
// Rutas
app.use(indexrouter);
app.use('/api/v1', carrersRouter);
app.use('/api/auth', authRouter);

export default app;