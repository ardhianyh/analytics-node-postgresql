import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IFilter } from "../types";

export const GetAppDynamicsSeverityController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const filter = req.query as IFilter;
   const result = await appDynamicRepository.getSolarwindsSeverity(filter);
   return res.status(200).json(result);
}