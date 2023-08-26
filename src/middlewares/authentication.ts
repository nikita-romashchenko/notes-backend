import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Secret, GetPublicKeyOrSecret } from "jsonwebtoken";

interface LooseRequest extends Request {
  [key: string]: any;
}

function authenticateToken(req: LooseRequest, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(
    token,
    <Secret | GetPublicKeyOrSecret>process.env.ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }
  );
}

module.exports = authenticateToken;
