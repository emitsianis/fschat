import express from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async register(req: express.Request, res: express.Response) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.registerUser(username, password);

      return res.json(user);
    } catch (error) {
      throw error;
    }
  }
}
