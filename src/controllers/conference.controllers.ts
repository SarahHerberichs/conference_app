import { NextFunction, Request, Response } from "express";
import { OrganizeConferenceDTO } from "../app/dto/conference.dto";
import container from "../app/injection/dependency-injection";
import { RequestValidator } from "../app/utils/validate-requests";

//Plus besoin car injection dependances
// const repository = new InMemoryConferenceRepository();
// const idGenerator = new UUIDGenerator();
// const dateGenerator = new CurrentDateGenerator();
// const usecase = new OrganizeConference(repository, idGenerator, dateGenerator);

export const organizeConference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Contenu de la requete
    const body = req.body;
    //Destructuration de la fonction qui renvoie erreurs en fonction
    //De la data (input) injecté dans l'instance du DTO pour controle
    //de validité
    //Execute la demande de validation, stocke le resultats dans error et input
    const { errors, input } = await RequestValidator(
      OrganizeConferenceDTO,
      req.body
    );
    if (errors) return res.jsonError(errors, 400);
    // const result = await usecase.execute({
    const result = await container
      .resolve("organizeConferenceUsecase")
      .execute({
        title: input.title,
        seats: input.seats,
        startDate: input.startDate,
        endDate: input.endDate,
        user: req.user,
      });

    return res.jsonSuccess({ id: result }, 201);
  } catch (error) {
    next(error);
  }
};
