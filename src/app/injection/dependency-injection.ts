import { asClass, asValue, createContainer } from "awilix";
import { IAuthenticator } from "../../interfaces/authenticator.interface";
import { IDateGenerator } from "../../interfaces/date-generator.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference-repository";
import { InMemoryUserRepository } from "../../repositories/in-memory-user-repository";
import { JwtAuthenticator } from "../../services/jwt-authenticator";
import { OrganizeConference } from "../../usecases/organize-conference";
import { CurrentDateGenerator } from "../../utils/current-date-generator";
import { UUIDGenerator } from "../../utils/uuid-generator";

interface Dependencies {
  organizeConferenceUsecase: OrganizeConference;
  conferenceRepository: InMemoryConferenceRepository;
  userRepository: InMemoryUserRepository;
  idGenerator: IIDGenerator;
  dateGenerator: IDateGenerator;
  authenticator: IAuthenticator;
}
const container = createContainer<Dependencies>();
//QUE LES CLASS SANS PARM CONSTRUCTEURS?
container.register({
  conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
  userRepository: asClass(InMemoryUserRepository).singleton(),
  idGenerator: asClass(UUIDGenerator).singleton(),
  dateGenerator: asClass(CurrentDateGenerator).singleton(),
});
const conferenceRepository = container.resolve("conferenceRepository");
const idGenerator = container.resolve("idGenerator");
const dateGenerator = container.resolve("dateGenerator");
const userRepository = container.resolve("userRepository");
container.register({
  //A besoin des instances présentes dans le premier register
  organizeConferenceUsecase: asValue(
    new OrganizeConference(conferenceRepository, idGenerator, dateGenerator)
  ),
  authenticator: asValue(new JwtAuthenticator(userRepository)),
});

export default container;
