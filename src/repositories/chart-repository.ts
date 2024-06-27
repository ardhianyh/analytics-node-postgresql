import { IDatabase, IFilter } from "../types";
import { IChart } from "../types/chart";

export class ChartRepository {
   constructor(private database: IDatabase) { }

   async getChart(filter: IFilter): Promise<{ app: string, total: number }[] | Error | undefined> {
      const query = await this.database.query<{ app: string, total: number }>(`
         SELECT * FROM public.get_chart(
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