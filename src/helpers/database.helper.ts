import mongoose from "mongoose";
import { env } from "../configs/env.config";

export class DatabaseHelper {
  public setupDatabase(): void {
    mongoose.connect(env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error: "));
    db.once("open", () => {
      console.log("MongoDB connected");
    });
  }
}
