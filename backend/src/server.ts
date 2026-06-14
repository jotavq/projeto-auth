import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/database";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import { generalLimiter } from "./middlewares/rateLimitMiddleware";
import helmet from "helmet";

connectDB();

const app: Application = express();

// Segurança
app.use(generalLimiter);
app.use(helmet());

// middlewars globais
const allowedOrigins = env.FRONTEND_URL
  ? [env.FRONTEND_URL]
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origem não permitida pelo CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));

// Rotas
app.get("/home", (_req, res) => {
  res.json({ status: "ok", message: "servidor funcionando!" });
});

app.use("/api/auth", authRoutes);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
