import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  jwt.verify(token!, "secret", (err: any, user: any) => {
    if (err) {
      return res.json({ message: err });
    } else {
      req.user = user;
      next();
    }
  });
};
export default isAuthenticated;
