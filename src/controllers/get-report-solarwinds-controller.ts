import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";

export const GetReportSolarwindsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const result = await solarwindsRepository.getSolarwindsUpload();
   return res.status(200).json(result);
}