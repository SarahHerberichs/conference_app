import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
//Définition de ce que doivent etre les propriétés d'une organisation
export class OrganizeConferenceDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsNumber()
  seats: number;
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
