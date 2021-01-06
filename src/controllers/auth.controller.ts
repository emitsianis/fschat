import express from "express";
import { ErrorHelper } from "../helpers/error.helper";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public static async register(req: express.Request, res: express.Response) {
    try {
      const { email, username, password } = req.body;
      const user = await AuthService.registerUser(email, username, password);

      return res.json(user);
    } catch (error) {
      return ErrorHelper.getErrorResponse(res, error);
    }
  }

  public static async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const jwt = await AuthService.login(email, password);

      return res.json(jwt);
    } catch (error) {
      return ErrorHelper.getErrorResponse(res, error);
    }
  }
}
