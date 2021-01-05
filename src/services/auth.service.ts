import { IUserSchemma } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class AuthService {
  public static async registerUser(username: string, password: string): Promise<IUserSchemma> {
    const user = new User({ username, password });
    return await user.save();
  }
}
