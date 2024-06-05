import { Request, Response } from "express";
import { appDynamicRepository, solarwindsRepository } from "../repositories";
import { ISolarwinds } from "../types";

const keyMapping: { [key: string]: string } = {
   "Alert": "alert",
   "Severity": "severity",
   "Layanan": "layanan",
   "Priority": "priority",
   "Service Time": "service_time",
   "IP Address": "ip_address",
   "Node Name": "node_name",
   "Percent Disk Used": "percent_disk_used",
   "Disk Used": "disk_used",
   "CPU Load": "cpu_load",
   "Memory Used": "memory_used",
   "Total CPU Count": "total_cpu_count",
   "Total Memory": "total_memory",
   "OS": "os"
};

export const InsertSolarwindsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const input = transformObject(req.body) as ISolarwinds;
   const result = await solarwindsRepository.insertSolarwinds(input);

   return res.status(201).json(result);
}

const transformObject = (input: { [key: string]: any }): { [key: string]: any } => {
   const output: { [key: string]: any } = {};

   for (const key in input) {
      if (keyMapping.hasOwnProperty(key)) {
         const newKey = keyMapping[key];
         output[newKey] = input[key];
      } else {
         output[key] = input[key];
      }
   }

   return output;
}