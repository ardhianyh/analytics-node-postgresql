import { IDatabase, IFilter } from "../types";
import { IChart } from "../types/chart";

export class ChartRepository {
   constructor(private database: IDatabase) { }

   async getChart(filter: IFilter): Promise<{ app: string, total: number }[] | Error | undefined> {
      const query = await this.database.query<{ app: string, total: number }>(`
         WITH severity_counts AS (
            SELECT
               source,
               layanan,
               COUNT(*) FILTER (WHERE LOWER(severity) = 'critical') AS critical,
               COUNT(*) FILTER (WHERE LOWER(severity) = 'warning') AS warning,
               COUNT(*) FILTER (WHERE LOWER(severity) = 'serious') AS serious
            FROM public.chart
            WHERE LOWER(severity) != 'info'
            AND (
               (${filter.start_date ? `'${filter.start_date}'` : `NULL`} IS NULL AND ${filter.end_date ? `'${filter.end_date}'` : `NULL`} IS NULL) OR 
               (DATE(created_at) BETWEEN ${filter.start_date ? `'${filter.start_date}'` : `NULL`} AND ${filter.end_date ? `'${filter.end_date}'` : `NULL`})
            )
            AND (
               (${filter.start_time ? `'${filter.start_time}'` : `NULL`} IS NULL AND ${filter.end_time ? `'${filter.end_time}'` : `NULL`} IS NULL) OR 
               (created_at::time(0) BETWEEN ${filter.start_time ? `'${filter.start_time}'` : `NULL`} AND ${filter.end_time ? `'${filter.end_time}'` : `NULL`})
            )
            AND (${filter.month ? `'${filter.month}'` : `NULL`} IS NULL OR TO_CHAR(created_at, 'YYYY-MM') = ${filter.month ? `'${filter.month}'` : `NULL`})
            AND (${filter.year ? `'${filter.year}'` : `NULL`} IS NULL OR TO_CHAR(created_at, 'YYYY') = ${filter.year ? `'${filter.year}'` : `NULL`})
            GROUP BY source, layanan
         )
         SELECT
            layanan,
            SUM(critical + warning + serious) AS total,
            jsonb_object_agg(
               source,
               jsonb_build_object(
                     'critical', critical,
                     'warning', warning,
                     'serious', serious
               )
            ) AS severity
         FROM severity_counts
         GROUP BY layanan
         ORDER BY total DESC
         LIMIT COALESCE(${filter.limit}, 5);
      `,
         []
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows;
   }

   async insertChart(data: IChart): Promise<IChart | Error | undefined> {
      const query = await this.database.query<IChart>(`
         INSERT INTO public.chart (alert, source, layanan, severity, created_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *
      `,
         [
            data.alert,
            data.source,
            data.layanan,
            data.severity,
            data.created_at
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }
}