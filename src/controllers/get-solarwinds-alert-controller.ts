import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";

export const GetSolarwindsAlertController = async (
   _: Request,
   res: Response
): Promise<Response | void> => {

   const result = await solarwindsRepository.getSolarwindsAlert();
   return res.status(200).json(result);
}