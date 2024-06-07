import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { IFilter } from "../types";

export const GetSolarwindsChartController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const filter = req.query as IFilter;
   const result = await solarwindsRepository.getSolarwindsChart(filter);
   return res.status(200).json(result);
}