import { AwilixContainer } from "awilix";
import { User } from "../../entities/user.entity";
import { IFixture } from "./fixture.interface";

export class UserFixture implements IFixture {
  constructor(public entity: User) {}

  async load(container: AwilixContainer): Promise<void> {
    const repository = container.resolve("userRepository");
    await repository.create(this.entity);
  }
}
