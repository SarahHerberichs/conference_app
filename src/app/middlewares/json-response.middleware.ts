import { NextFunction, Request, Response } from "express";
//Structure d'une api response
export interface ApiResponse {
  success: boolean;
  data: any;
  error?: {
    message: string;
    code: number;
  };
}
//structure d'une response tout court
declare module "express-serve-static-core" {
  interface Response {
    jsonSuccess(data: any, statusCode: number): void;
    jsonError(error: any, statusCode: number): void;
  }
}

export const jsonResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Défini JsonSuccess
  res.jsonSuccess = (data: any, statusCode: number) => {
    const response: ApiResponse = {
      success: true,
      data,
    };
    res.status(statusCode).json(response);
  };
  res.jsonError = (error: any, statusCode: number) => {
    const response: ApiResponse = {
      success: false,
      data: null,
      error: {
        message: error,
        code: statusCode,
      },
    };
    res.status(statusCode).json(response);
  };
  next();
};
