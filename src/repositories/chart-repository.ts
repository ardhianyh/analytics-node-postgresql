import { IDatabase, IFilter } from "../types";
import { IChart } from "../types/chart";

export class ChartRepository {
   constructor(private database: IDatabase) { }

   async getChart(filter: IFilter): Promise<{ app: string, total: number }[] | Error | undefined> {
      const query = await this.database.query<{ app: string, total: number }>(`
         SELECT * FROM public.get_chart(
            limit_in := $1,
            start_date_in := $2,
            end_date_in := $3,
            month_in := $4,
            year_in := $5,
            start_time_in := $6,
            end_time_in := $7
         )
      `,
         [
            filter.limit ?? 10,
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

      return query.rows;
   }

   async insertChart(data: IChart): Promise<IChart | Error | undefined> {
      const query = await this.database.query<IChart>(`
         INSERT INTO public.chart (alert, layanan, severity, created_at)
         VALUES ($1, $2, $3, $4)
         RETURNING *
      `,
         [
            data.alert,
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