import { NextFunction, Request, Response } from "express";
import { User } from "../../entities/user.entity";
import container from "../injection/dependency-injection";
import { extractToken } from "../utils/extract-token";

//Plus besoin car utilisation de l'injection via "container" dependance pour utiliser l'authenticator
// const userRepository = new InMemoryUserRepository();
// const authenticator = new BasicAuthenticator(userRepository);

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    container.resolve("userRepository").create(
      new User({
        id: "john-doe",
        email: "john.doe@gmail.com",
        password: "azerty",
      })
    );
    const authorization = req.headers.authorization;

    if (!authorization) return res.jsonError("Unauthorized", 403);

    const token = extractToken(authorization);
    if (!token) return res.jsonError("Unauthorized", 403);

    const user = await container.resolve("authenticator").authenticate(token);

    if (!user) return res.jsonError("Unauthorized", 403);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
