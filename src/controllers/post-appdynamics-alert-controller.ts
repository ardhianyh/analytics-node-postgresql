import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IAppDynamicsAlert } from "../types";

export const InsertAppDynamicsAlertController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const input = req.body as IAppDynamicsAlert;
   const result = await appDynamicRepository.insertAppDynamicsAlert(input);

   return res.status(201).json(result);
}