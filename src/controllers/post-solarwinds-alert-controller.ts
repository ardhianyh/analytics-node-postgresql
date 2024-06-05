import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { ISolarwindsAlert } from "../types";

export const InsertSolarwindsAlertController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const input = req.body as ISolarwindsAlert;
   const result = await solarwindsRepository.insertSolarwindsAlert(input);

   return res.status(201).json(result);
}