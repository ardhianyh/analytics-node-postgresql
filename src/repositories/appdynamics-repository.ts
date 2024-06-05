import { IDatabase, IAppDynamics, IAppDynamicsAlert, IAppDynamicsParameters, IParams, IAppDynamicsParams } from "../types";

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

   async insertAppDynamics(data: IAppDynamics, params: IAppDynamicsParameters): Promise<IAppDynamics | Error> {
      const query = await this.database.query<IAppDynamics>(
         `SELECT * FROM appsdynamics.insert_appsdynamics(
            appsdynamics_alert_id_in := $1,
            to_number_in := $2,
            to_name_in := $3,
            channel_integration_id_in := $4,
            message_template_id_in := $5,
            language_in := $6,
            parameters_in := $7
         )`,
         [
            data.appsdynamics_alert_id,
            data.to_number,
            data.to_name,
            data.channel_integration_id,
            data.message_template_id,
            JSON.stringify(data.language),
            params
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

   async insertAppDynamicsAlert(data: IAppDynamicsAlert): Promise<IAppDynamicsAlert | Error> {
      const query = await this.database.query<IAppDynamicsAlert>(`
         INSERT INTO appsdynamics.appsdynamics_alert 
         (name) 
         VALUES ($1) 
         RETURNING *
      `, [
         data.name,
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
   }
}