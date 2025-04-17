import { Conference } from "../entities/conference.entity";
//Définition d'un Repository - contrat ici
export interface IConferenceRepository {
  findById(id: string): Promise<Conference | null>;
  create(conference: Conference): Promise<void>;
}
