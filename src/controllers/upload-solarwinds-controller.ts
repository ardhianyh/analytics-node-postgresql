import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { ISolarwindsUpload } from "../types";

export const UploadSolarwindsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const input = req.body as ISolarwindsUpload[];
   let results: ISolarwindsUpload[] = [];
   for (let index = 0; index < input.length; index++) {
      const data = input[index];
      const result = await solarwindsRepository.insertSolarwindsUpload(data);
      if (result instanceof Error) {
         return res.status(500).send(result.message);
      }
      results.push(result);
   }
   return res.status(201).json(results);
}
