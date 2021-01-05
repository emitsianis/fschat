import express from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.post("/register", AuthController.register);
  }
}
