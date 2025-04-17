import { IIDGenerator } from "../interfaces/id-generator.interface";

//Utilise l'interface et retourne 1
export class FixedIDGenerator implements IIDGenerator {
  generate(): string {
    return "1";
  }
}
