import { Router } from "express";
import { UserController } from "../Controllers/users.js";

export const Usersrouter = Router();

Usersrouter.post('/register', UserController.register);
Usersrouter.post('/login', UserController.login);