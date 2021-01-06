import { IApiError } from "../interfaces/api-error.interface";
import { Response } from "express";

export class ErrorHelper {
  public static getErrorResponse(res: Response, error: IApiError) {
    console.error(`Got an error:`);
    console.error(`Status: ${error.status}`);
    console.error(`Message: ${error.message}`);
    console.error(`Stack: ${error.stack}`);

    return res
      .status(error.status || 500)
      .json(error.message || "Server error");
  }
}
