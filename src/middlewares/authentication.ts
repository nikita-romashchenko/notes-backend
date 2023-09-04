import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import { HttpStatusCode } from "../utils/constants";

//TO DO: replae any with more fitting type
interface RequestWithUser extends Request {
  user?: any;
}

function authenticateToken(req: RequestWithUser, res: Response, next: any) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user) => {
    if (err) {
      return res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    }
    req.user = user;
    next();
  });
}

export { authenticateToken, RequestWithUser };
