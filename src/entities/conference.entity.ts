import { differenceInDays, differenceInHours } from "date-fns";

export type ConferenceProps = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  organizerId: string;
};
export class Conference {
  constructor(public props: ConferenceProps) {}

  isTooClose(now: Date): boolean {
    const diff = differenceInDays(this.props.startDate, now);
    return diff < 3;
  }
  isTooLong(): boolean {
    return differenceInHours(this.props.endDate, this.props.startDate) > 3;
  }
  hasNotEnoughSeats(): boolean {
    return this.props.seats < 20;
  }
  hasTooManySeats(): boolean {
    return this.props.seats > 1000;
  }
}
