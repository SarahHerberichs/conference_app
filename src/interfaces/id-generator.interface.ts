//Défini regles du générateur

//Définition d'un Repository - contrat ici
export interface IIDGenerator {
  generate(): string;
}
