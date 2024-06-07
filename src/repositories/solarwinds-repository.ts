import { IDatabase, IFilter, ISolarwinds, ISolarwindsParams } from "../types";

export class SolarwindsRepository {
   constructor(private database: IDatabase) { }

   async getSolarwinds(params: ISolarwindsParams): Promise<ISolarwinds[] | Error | undefined> {
      const query = await this.database.query<ISolarwinds>(`
         SELECT * FROM solarwinds.get_solarwinds(
            page_in := $1,
            limit_in := $2,
            severity_in := $3,
            layanan_in := $4,
            priority_in := $5
         )
      `,
         [
            params.page,
            params.limit,
            params.severity,
            params.layanan,
            params.priority
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(data => data as ISolarwinds);
   }

   async insertSolarwinds(data: ISolarwinds): Promise<ISolarwinds | Error> {
      const query = await this.database.query<ISolarwinds>(`
         INSERT INTO solarwinds.solarwinds 
         (alert, severity, layanan, priority, service_time, ip_address, node_name, percent_disk_used, disk_used, memory_used, total_cpu_count, total_memory, os) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
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
         data.memory_used,
         data.total_cpu_count,
         data.total_memory,
         data.os,
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

   async getSolarwindsSeverity(filter: IFilter): Promise<{ severity: string, total: number }[] | Error | undefined> {
      const query = await this.database.query<{ severity: string, total: number }>(`
         SELECT * FROM solarwinds.get_severity(
            alert_in := $1,
            limit_in := $2,
            start_date_in := $3,
            end_date_in := $4,
            month_in := $5,
            year_in := $6
         )
      `,
         [
            filter.alert ?? null,
            filter.limit ?? 10,
            filter.start_date ?? null,
            filter.end_date ?? null,
            filter.month ?? null,
            filter.year ?? null
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows;
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