import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
//Validation en  instanciant un DTO préparé avec ses décorateurs, en lui passant la data réelle

//fonction qui a une classe instanciée en entrée(input), et retourne une Promise de type classvalidator ou false
const validationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  //demande validation (respect du dto) à class validator
  const errors = await validate(input, {
    validationError: { target: true },
  });
  if (errors.length > 0) return errors;
  return false;
};
//fonction avec un constructeur et de la data, renvoi une promesse
export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any
): Promise<{ errors: boolean | string; input: T }> => {
  //transforme la data qu'il y a dans le body en l'instance de la class que
  //l'on passe dans type (une class DTO en general qui sera controlé par validator)
  const input = plainToClass(type, body);
  //Demande la validation de l'input
  const errors = await validationError(input);
  if (errors) {
    const errorMessage = errors
      .map((error) => (Object as any).values(error.constraints))
      .join(", ");
    return { errors: errorMessage, input };
  }
  return { errors: false, input };
};
