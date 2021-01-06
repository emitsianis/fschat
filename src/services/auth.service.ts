import { IUserSchema } from "../models/user.model";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../shared/classes/error.class";
import { env } from "../configs/env.config";

export class AuthService {
  public static async registerUser(
    email: string,
    username: string,
    password: string
  ): Promise<IUserSchema> {
    const passwordHash = await AuthService.hashPassword(password);

    const user = new User({ email, username, password: passwordHash });
    return await user.save();
  }

  public static async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError(`Invalid credentials`, 401);

    const isPasswordCorrect = await AuthService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) throw new ApiError(`Invalid credentials`, 401);

    return AuthService.singAndGetJwtForUser(user.email);
  }

  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private static singAndGetJwtForUser(email: string): string {
    return jwt.sign({ user: email }, env.jwtSecret, { expiresIn: "365d" });
  }
}
