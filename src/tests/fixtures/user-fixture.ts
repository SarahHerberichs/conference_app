import { AwilixContainer } from "awilix";
import { sign } from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { IFixture } from "./fixture.interface";

export class UserFixture implements IFixture {
  constructor(public entity: User) {}

  async load(container: AwilixContainer): Promise<void> {
    const repository = container.resolve("userRepository");
    await repository.create(this.entity);
  }

  createBasicAuthorization() {
    return `Basic ${Buffer.from(
      `${this.entity.props.email}:${this.entity.props.password}`
    ).toString("base64")}`;
  }

  createJwtAuthorization() {
    const payload = { email: this.entity.props.email };
    return `Bearer ${sign(payload, "CLE SECRETE", { expiresIn: "1h" })}`;
  }
}
