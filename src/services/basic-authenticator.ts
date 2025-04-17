//2e étape
//aler sur base64encore.org pr generer token et le placer dans requests.http (l'api va recuperer le token)
import { User } from "../entities/user.entity";
import { IAuthenticator } from "../interfaces/authenticator.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class BasicAuthenticator implements IAuthenticator {
  constructor(private readonly userRepository: IUserRepository) {}
  async authenticate(token: string): Promise<User> {
    //am9obi5kb2VAZ21haWwuY29tOmF6ZXJ0eQ==
    const decoded = Buffer.from(token, "base64").toString("utf-8"); //john.doe@gmail.com:azerty
    const [email, password] = decoded.split(":");

    const user = await this.userRepository.findByEmail(email);

    if (!user || user.props.password != password)
      throw new Error("User/Password wrong");

    return user;
  }
}

//InMemoryUserRepository + methodes pour retrouver user
