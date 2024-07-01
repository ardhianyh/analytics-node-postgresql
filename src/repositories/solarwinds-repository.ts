import { IDatabase, IFilter, ISolarwinds, ISolarwindsUpload } from "../types";
import { convertDateToTimestamp } from "../utils";

export class SolarwindsRepository {
   constructor(private database: IDatabase) { }

   async getSolarwinds(filter: IFilter): Promise<ISolarwinds[] | Error | undefined> {
      const query = await this.database.query<ISolarwinds>(`
         SELECT * FROM public.get_solarwinds(
            limit_in := $1,
            layanan_in := $2,
            start_date_in := $3,
            end_date_in := $4,
            month_in := $5,
            year_in := $6,
            start_time_in := $7,
            end_time_in := $8
         )
      `,
         [
            filter.limit ?? 10,
            filter.layanan,
            filter.start_date ?? null,
            filter.end_date ?? null,
            filter.month ?? null,
            filter.year ?? null,
            filter.start_time ?? null,
            filter.end_time ?? null
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(data => data as ISolarwinds);
   }

   async getSolarwindsUpload(): Promise<ISolarwindsUpload[] | Error | undefined> {
      const query = await this.database.query<ISolarwindsUpload>(`
         SELECT * FROM public.solarwinds_upload;
      `,
         []
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows;
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

   async insertSolarwindsUpload(data: ISolarwindsUpload): Promise<ISolarwindsUpload | Error> {
      const query = await this.database.query<ISolarwindsUpload>(`
         INSERT INTO public.solarwinds_upload
         (alert, severity, layanan, priority, service_time, ip_address, node_name, percent_disk_used, disk_used, cpu_load, memory_used, total_cpu_count, total_memory, os, no_layanan, hostname, max_cpu_used, max_memory_used) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
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
         data.no_layanan,
         data.hostname,
         data.max_cpu_used,
         data.max_memory_used
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