import { Request, Response } from "express";
import { User } from "./user.model";
import { HttpStatusCode } from "../../utils/constants";
import * as hash from "../../utils/hash";
import * as jwt from "jsonwebtoken";

const signIn = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;
  //1.Check if user exists
  const userDoc = await User.findOne({ username });
  if (userDoc === null) {
    return (res.send("Incorrect username and/or password").statusCode =
      HttpStatusCode.BAD_REQUEST);
  }

  //2. If user exists check if password is correct
  if (await hash.verify(userDoc.passwordHash, password)) {
    //3. Give jwt token to user
    const user = {
      username: userDoc.username,
      uuid: userDoc.uuid,
    };
    const accessToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret
    );
    return res.send({
      accessToken,
      username: userDoc.username,
    });
  } else {
    return res.sendStatus(401);
  }
};

const signUp = async (req: Request, res: Response) => {};

const refresh = async (req: Request, res: Response) => {};

export { signIn, signUp, refresh };
