import { User } from "../entities/user.entity";
import { InMemoryConferenceRepository } from "../repositories/in-memory-conference-repository";
import { FixedDateGenerator } from "../utils/fixed-date-generator";
import { FixedIDGenerator } from "../utils/fixed-id-generator";
import { OrganizeConference } from "./organize-conference";

describe("Organize conference", () => {
  const johnDoe = new User({
    id: "john-doe",
    email: "john.doe@gmail.com",
    password: "azerty",
  });
  let repository: InMemoryConferenceRepository;
  let fixedIdGenerator: FixedIDGenerator;
  let usecase: OrganizeConference;
  let dateGenerator: FixedDateGenerator;
  beforeEach(() => {
    repository = new InMemoryConferenceRepository();
    fixedIdGenerator = new FixedIDGenerator();
    dateGenerator = new FixedDateGenerator();
    //Passe a organiseconference le repository qui contient findbyid
    usecase = new OrganizeConference(
      repository,
      fixedIdGenerator,
      dateGenerator
    );
  });
  describe("Scenario: Create conference", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-04T00:00:00.000Z"),
      endDate: new Date("2025-01-04T00:00:00.000Z"),
      seats: 100,
      user: johnDoe,
    };
    it("should create a conference", async () => {
      //Methode ORganiseConferenceUseCase qui prend un title en param,
      // -cree une nouvelle conf (attend id et title) via Conference
      // - ajoute à bdd via Repository
      //RETOURNE LE TITRE
      const id = await usecase.execute(payload);
      const conference = await repository.findById(id);

      expect(conference!.props.title).toEqual("Ma nouvelle conference");
    });
  });
  describe("Scenario: Conference happens too soon", () => {
    const payload = {
      title: "Ma nouvelle conférence",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-01-01T00:00:00.000Z"),
      seats: 100,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => usecase.execute(payload)).rejects.toThrow(
        "the conf must happen in at least 3 days"
      );
    });
  });
  describe("Scenario: conference has too many seats", () => {
    const payload = {
      title: "Ma nouvelle conférence",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-01-04T00:00:00.000Z"),
      seats: 1001,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => usecase.execute(payload)).rejects.toThrow(
        "conference has too many seats"
      );
    });
  });
  describe("Scenario: conference has not enough seats", () => {
    const payload = {
      title: "Ma nouvelle conférence",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-01-04T04:00:00.000Z"),
      seats: 0,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => usecase.execute(payload)).rejects.toThrow(
        "conference has not enough seats"
      );
    });
  });
});
