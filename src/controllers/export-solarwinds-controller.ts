import { Request, Response } from "express";
import { solarwindsRepository } from "../repositories";
import { ISolarwindsParams } from "../types";
import { Parser } from 'json2csv';

export const ExportSolarwindsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const params = req.query as ISolarwindsParams;
   const result = await solarwindsRepository.getSolarwinds(params);

   if (result instanceof Error) {
      return res.status(500).send(result.message);
   }

   if (!result) {
      return res.status(500).send('Encounter an error during fetch solarwinds data');
   }

   const json2csvParser = new Parser({ delimiter: ';' });
   const csv = json2csvParser.parse(result);

   res.header('Content-Type', 'text/csv');
   res.attachment('solarwinds.csv');
   return res.send(csv);
}