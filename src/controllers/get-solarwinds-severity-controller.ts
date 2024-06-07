import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { IFilter } from "../types";

export const GetSolarwindsSeverityController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const filter = req.query as IFilter;
   const result = await solarwindsRepository.getSolarwindsSeverity(filter);
   return res.status(200).json(result);
}