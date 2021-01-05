import express from "express";
import { AuthRouter } from "./auth.router";

export class MainRouter {
  constructor(private app: express.Application) {}

  public setupRouting(): void {
    const authRouter = new AuthRouter();
    this.app.use("/auth", authRouter.router);
  }
}
