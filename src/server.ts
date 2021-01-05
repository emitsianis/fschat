import express from "express";
require("dotenv").config();
import { env } from "./configs/env.config";
import http from "http";
import { MainRouter } from "./routers/main.router";
import { DatabaseHelper } from "./helpers/database.helper";

class Server {
  public server: http.Server;

  constructor() {
    this.server = this.getServer();
    this.setupTools();
  }

  public start(): void {
    this.server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  }

  private getServer(): http.Server {
    const app = express();

    this.setupMidleware(app);
    this.setupRouting(app);

    return http.createServer(app);
  }

  private setupRouting(app: express.Application): void {
    const mainRouter = new MainRouter(app);
    mainRouter.setupRouting();
  }

  private setupMidleware(app: express.Application): void {
    app.use(express.json());
  }

  private setupTools(): void {
    const dbHelper = new DatabaseHelper();
    dbHelper.setupDatabase();
  }
}

const server = new Server();
server.start();
