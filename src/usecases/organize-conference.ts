import { Conference } from "../entities/conference.entity";
import { User } from "../entities/user.entity";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";
import { IDateGenerator } from "../interfaces/date-generator.interface";
import { IIDGenerator } from "../interfaces/id-generator.interface";

export type OrganizeConferencePayload = {
  title: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  user: User;
};
export class OrganizeConference {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly idGenerator: IIDGenerator,
    private readonly dateGenerator: IDateGenerator
  ) {}
  //Doit tout verifier - envoi en bdd - si ok, renvoi id
  async execute(data: OrganizeConferencePayload) {
    const id = this.idGenerator.generate();
    const conference = new Conference({
      id: id,
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      seats: data.seats,
      organizerId: data.user.props.id,
    });

    if (conference.hasTooManySeats())
      throw new Error("conference has too many seats");
    if (conference.hasNotEnoughSeats())
      throw new Error("conference has not enough seats");
    if (conference.isTooLong())
      throw new Error("the conference is too long (>3 hours)");
    if (conference.isTooClose(this.dateGenerator.now()))
      throw new Error("the conf must happen in at least 3 days");
    this.repository.create(conference);
    return id;
  }
}
