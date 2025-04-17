import { User } from "../../entities/user.entity";
import { UserFixture } from "../fixtures/user-fixture";

export const e2eUsers = {
  john: new UserFixture(
    new User({
      id: "john-doe",
      email: "john.doe@gmail.com",
      password: "azerty",
    })
  ),
  alice: new UserFixture(
    new User({
      id: "Alice-doe",
      email: "alice.doe@gmail.com",
      password: "azerty",
    })
  ),
};
