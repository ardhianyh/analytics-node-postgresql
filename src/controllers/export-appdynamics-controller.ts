import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IAppDynamicsParams } from "../types";
import { Parser } from 'json2csv';

export const ExportAppdynamicsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {
   const params = req.query as IAppDynamicsParams;
   const result = await appDynamicRepository.getAppDynamics(params);

   if (result instanceof Error) {
      return res.status(500).send(result.message);
   }

   if (!result) {
      return res.status(500).send('Encounter an error during fetch appdynamics data');
   }

   const json2csvParser = new Parser({ delimiter: ';' });
   const csv = json2csvParser.parse(result);

   res.header('Content-Type', 'text/csv');
   res.attachment('appdynamics.csv');
   return res.send(csv);
}