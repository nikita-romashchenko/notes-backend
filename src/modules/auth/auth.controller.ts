import { Request, Response } from "express";
import { User } from "./user.model";
import { HttpStatusCode } from "../../utils/constants";
import * as hash from "../../utils/hash";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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
    const jwtPayload = {
      subject: userDoc.uuid,
      name: userDoc.username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const accessToken = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET as jwt.Secret
    );
    return res.send({
      accessToken,
      username: userDoc.username,
    });
  } else {
    return (res.send("Incorrect username and/or password").statusCode =
      HttpStatusCode.BAD_REQUEST);
  }
};

const signUp = async (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  //1.Check if user exists
  if ((await User.findOne({ username })) !== null) {
    return (res.send("Provided username already in use").statusCode =
      HttpStatusCode.BAD_REQUEST);
  }

  try {
    await User.create({
      uuid: uuidv4(),
      username,
      passwordHash: await hash.get(password),
    });
    res.sendStatus(HttpStatusCode.OK);
  } catch (e: any) {
    res.send(e.message).statusCode = HttpStatusCode.BAD_REQUEST;
  }
};

const refresh = async (req: Request, res: Response) => {};

export { signIn, signUp, refresh };
