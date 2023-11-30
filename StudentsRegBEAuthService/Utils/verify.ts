import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verified = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const realToken = token.split(" ")[1];
    if (realToken) {
      jwt.verify(realToken, (err, payload: any) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      return res.status(400).json({
        message: "There's definitely sth wrong with your token",
      });
    }
  } else {
    return res.status(400).json({
      message: "You ain't authorized here",
    });
  }
};
