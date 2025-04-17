import { AwilixContainer } from "awilix";
import express, { Application } from "express";
import { errorHandlerMiddleware } from "../../app/middlewares/error-handler.middleware";
import { jsonResponseMiddleware } from "../../app/middlewares/json-response.middleware";
import { conferenceRoutes } from "../../routes/conference.routes";
import { IFixture } from "../fixtures/fixture.interface";

export class TestApp {
  private app: Application;
  private container: AwilixContainer;

  constructor() {
    this.app = express();
    this.container = this.container;
  }
  async setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(jsonResponseMiddleware);
    this.app.use(conferenceRoutes);
    this.app.use(errorHandlerMiddleware);
  }
  async loadFixtures(fixtures: IFixture[]) {
    return Promise.all(
      fixtures.map((fixtures) => fixtures.load(this.container))
    );
  }
  get expressApp() {
    return this.app;
  }
}
