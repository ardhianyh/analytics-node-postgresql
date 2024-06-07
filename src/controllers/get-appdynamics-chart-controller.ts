import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IFilter } from "../types";

export const GetAppDynamicsChartController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const filter = req.query as IFilter;
   const result = await appDynamicRepository.getAppDynamicsChart(filter);
   return res.status(200).json(result);
}