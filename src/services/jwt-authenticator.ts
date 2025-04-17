import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { IAuthenticator } from "../interfaces/authenticator.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";
export class JwtAuthenticator implements IAuthenticator {
  constructor(private readonly userRepository: IUserRepository) {}
  async authenticate(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, "CLE SECRETE") as { email: string };
      const user = await this.userRepository.findByEmail(decoded.email);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      if (error.message == "User not found") throw error;
      throw new Error("Invalid token");
    }
  }
  generateToken(user: User): string {
    return jwt.sign({ email: user.props.email }, "CLE SECRETE", {
      expiresIn: "1h",
    });
  }
}
