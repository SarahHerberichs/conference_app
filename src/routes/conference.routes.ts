import { Router } from "express";
import { authenticationMiddleware } from "../app/middlewares/authenticator.middleware";
import { organizeConference } from "../controllers/conference.controllers";

const router = Router();

router.use(authenticationMiddleware);
router.post("/conference", organizeConference);

export { router as conferenceRoutes };
