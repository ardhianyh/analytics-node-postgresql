import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IFilter } from "../types";

export const GetAppDynamicsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const queryParams = req.query as IFilter;
   const result = await appDynamicRepository.getAppDynamics(queryParams);
   return res.status(200).json(result);
}