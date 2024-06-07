import { IDatabase, IAppDynamics, IAppDynamicsAlert, IAppDynamicsParameters, IParams, IAppDynamicsParams, IAppDynamicAlarmMessage, IFilter } from "../types";

export class AppDynamicsRepository {
   constructor(private database: IDatabase) { }

   async getAppDynamics(params: IAppDynamicsParams): Promise<IAppDynamics[] | Error | undefined> {
      const query = await this.database.query<IAppDynamics>(`
         SELECT * FROM appsdynamics.get_appsdynamics(
            page_in := $1,
            limit_in := $2,
            severity_in := $3,
            app_in := $4,
            priority_in := $5
         )
      `, [
         params.page,
         params.limit,
         params.severity,
         params.app,
         params.priority
      ]);
      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(data => data as IAppDynamics);
   }

   async insertAppDynamics(data: IAppDynamics, params: IAppDynamicsParameters, alarm: IAppDynamicAlarmMessage): Promise<IAppDynamics | Error> {
      const query = await this.database.query<IAppDynamics>(
         `SELECT * FROM appsdynamics.insert_appsdynamics(
            alert_in := $1,
            to_number_in := $2,
            to_name_in := $3,
            channel_integration_id_in := $4,
            message_template_id_in := $5,
            language_in := $6,
            parameters_in := $7,
            alarm_in := $8
         )`,
         [
            data.alert,
            data.to_number,
            data.to_name,
            data.channel_integration_id,
            data.message_template_id,
            JSON.stringify(data.language),
            params,
            alarm
         ]
      );

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

   async getAppDynamicsAlert(): Promise<IAppDynamicsAlert[] | Error | undefined> {
      const query = await this.database.query<IAppDynamicsAlert>("SELECT * FROM appsdynamics.appsdynamics_alert", []);
      if (query instanceof Error) {
         return query;
      }

      return query.rows.map(data => data as IAppDynamicsAlert);
   }

   async getSolarwindsSeverity(filter: IFilter): Promise<{ severity: string, total: number }[] | Error | undefined> {
      const query = await this.database.query<{ severity: string, total: number }>(`
         SELECT * FROM appsdynamics.get_severity(
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
            UPDATE appsdynamics.appsdynamics SET klarifikasi = $2 WHERE id = $1;
      `, [id, klarifikasi]);
      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }

}