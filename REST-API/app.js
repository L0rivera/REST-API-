import express from "express";
import { Server } from 'socket.io';
import { createServer } from "node:http";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Middlewares
// import authenticateToken from "./lib/AuthenticateToken.js";

// Routes
import { Usersrouter } from "./Routes/user-routes.js";
import { Projectsrouter } from "./Routes/project-routes.js";
import { Sectionrouter } from "./Routes/section-routes.js";
import { Taskrouter } from "./Routes/task-routes.js";

const _dirname = path.dirname(fileURLToPath(import.meta.url));
export const methodsDir = {
  _dirname,
};

//Server
const app = express();

//Configuration to read
app.use(express.json());
app.use(bodyParser.json()); // Para parsear JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para parsear datos de formulario
app.use(cookieParser());
// CORS and CSP Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8000'
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback( new Error('Not allowed by Cors'))

    }, // o '*' para permitir todas las solicitudes
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000" || PORT],
    },
  })
);
//ENDPOINTS

// Users
app.use('/api', Usersrouter);

// Projects
app.use('/api', Projectsrouter);

// Sections
app.use('/api', Sectionrouter);

// Tasks
app.use('/api', Taskrouter);

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

export default app; // Exportar la aplicación Express como el módulo por defecto