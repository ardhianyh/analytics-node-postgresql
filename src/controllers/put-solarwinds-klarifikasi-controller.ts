import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";

export const PutSolarwindsKlarifikasiController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const id = req.params.id;
   const klarifikasi = req.body.klarifikasi;
   const result = await solarwindsRepository.updateKlarifikasi(id, klarifikasi);
   return res.status(200).json(result);
}