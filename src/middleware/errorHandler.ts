import { Request, Response, NextFunction } from "express";

interface Error {
  status?: number;
  message: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message } = err;

  res.status(status).json({ error: message });
}