import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../utils/constants";

export const checkJWTToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Login first' });
            }
            next();
        });
    } else {
      return res.status(401).json({ message: 'Login first' });
    }
}
