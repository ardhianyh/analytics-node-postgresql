import express, { Application, Request, Response } from "express";
import { route } from "./routers";

export const initializeApp = async (): Promise<Application> => {
  const app: Application = express();

  app.use(express.static('public'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', route);
  return app;
}