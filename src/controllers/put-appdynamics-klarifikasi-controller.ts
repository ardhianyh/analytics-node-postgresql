import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";

export const PutAppDynamicsKlarifikasiController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const id = req.params.id;
   const klarifikasi = req.body.klarifikasi;
   const result = await appDynamicRepository.updateKlarifikasi(id, klarifikasi);
   return res.status(200).json(result);
}