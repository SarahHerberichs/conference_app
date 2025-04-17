import { User } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class InMemoryUserRepository implements IUserRepository {
  constructor(private users: User[]) {
    this.users = [];
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.props.email === email) ?? null;
  }
}
