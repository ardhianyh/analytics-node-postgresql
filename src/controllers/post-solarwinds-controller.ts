import { Request, Response } from "express";
import { chartRepository, solarwindsRepository } from "../repositories";
import { ISolarwinds } from "../types";
import { IChart } from "../types/chart";

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

   if (result instanceof Error) {
      return res.status(500).send(result.message);
   }

   const chart: IChart = {
      alert: input.alert,
      layanan: input.layanan,
      severity: input.severity,
      created_at: result.created_at
   }

   const insertChart = await chartRepository.insertChart(chart);
   if (insertChart instanceof Error) {
      return res.status(500).send(insertChart.message);
   }

   return res.status(201).json({ solarwinds: result, chart: insertChart });
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