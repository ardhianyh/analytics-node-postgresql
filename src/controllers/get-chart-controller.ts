import { Request, Response } from "express";
import { chartRepository } from "../repositories";
import { IFilter } from "../types";

export const GetChartController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const filter = req.query as IFilter;
   const result = await chartRepository.getChart(filter);
   return res.status(200).json(result);
}