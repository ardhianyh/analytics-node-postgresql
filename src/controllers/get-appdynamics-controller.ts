import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IAppDynamicsParams, IParams } from "../types";

export const GetAppDynamicsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const queryParams = req.query as IAppDynamicsParams;
   const result = await appDynamicRepository.getAppDynamics(queryParams);
   return res.status(200).json(result);
}