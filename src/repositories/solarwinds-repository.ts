import { IDatabase, IFilter, ISolarwinds, ISolarwindsParams } from "../types";
import { convertDateToTimestamp } from "../utils";

export class SolarwindsRepository {
   constructor(private database: IDatabase) { }

   async getSolarwinds(params: ISolarwindsParams): Promise<ISolarwinds[] | Error | undefined> {
      const query = await this.database.query<ISolarwinds>(`
         SELECT * FROM public.get_solarwinds(
            page_in := $1,
            limit_in := $2,
            severity_in := $3,
            layanan_in := $4,
            priority_in := $5
         )
      `,
         [
            params.page ?? 0,
            params.limit ?? 10,
            params.severity ?? null,
            params.layanan ?? null,
            params.priority ?? null
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(data => data as ISolarwinds);
   }

   async insertSolarwinds(data: ISolarwinds): Promise<ISolarwinds | Error> {
      const query = await this.database.query<ISolarwinds>(`
         INSERT INTO public.solarwinds 
         (alert, severity, layanan, priority, service_time, ip_address, node_name, percent_disk_used, disk_used, cpu_load, memory_used, total_cpu_count, total_memory, os, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
         RETURNING *
      `, [
         data.alert,
         data.severity,
         data.layanan,
         data.priority,
         data.service_time,
         data.ip_address,
         data.node_name,
         data.percent_disk_used,
         data.disk_used,
         data.cpu_load,
         data.memory_used,
         data.total_cpu_count,
         data.total_memory,
         data.os,
         convertDateToTimestamp(data.created_at)
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

   async updateKlarifikasi(id: string, klarifikasi: string): Promise<{ klarifikasi: string } | Error | undefined> {
      const query = await this.database.query<{ klarifikasi: string }>(`
            UPDATE solarwinds.solarwinds SET klarifikasi = $2 WHERE id = $1;
      `, [id, klarifikasi]);
      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }
}