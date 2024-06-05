import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";

export const GetAppDynamicsAlertController = async (
   _: Request,
   res: Response
): Promise<Response | void> => {

   const result = await appDynamicRepository.getAppDynamicsAlert();
   return res.status(200).json(result);
}