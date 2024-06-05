import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { ISolarwindsParams } from "../types";

export const GetSolarwindsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const params = req.query as ISolarwindsParams;
   const result = await solarwindsRepository.getSolarwinds(params);
   return res.status(200).json(result);
}