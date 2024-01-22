// Nem preciso

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "ranzor123");
      next();
    } catch (error) {
      res.status(401).json({
        msg: "Token inválido!",
      }); 
    }   
  } else {
    res.status(401).json({
      msg: "Acesso negado.",
    }); 
  }
};
