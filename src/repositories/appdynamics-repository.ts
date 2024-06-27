import { IDatabase, IAppDynamics, IAppDynamicsParameters, IParams, IAppDynamicsParams, IAppDynamicAlarmMessage, IFilter } from "../types";
import { convertDateToTimestamp } from "../utils";

export class AppDynamicsRepository {
   constructor(private database: IDatabase) { }

   async getAppDynamics(params: IAppDynamicsParams): Promise<IAppDynamics[] | Error | undefined> {
      const query = await this.database.query<IAppDynamics>(`
         SELECT * FROM public.get_appsdynamics(
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
      const query = await this.database.query<IAppDynamics>(`
         INSERT INTO public.appsdynamics(
            alert, to_number, to_name, channel_integration_id, message_template_id, language, severity, app, priority, service_time, event_name, recipient_name, alarm_message, normal, slow, very_slow, stall, error, date_time, created_at
         ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
         ) 
         RETURNING *
      `, [
         data.alert,
         data.to_number,
         data.to_name,
         data.channel_integration_id,
         data.message_template_id,
         JSON.stringify(data.language),
         params.severity,
         params.app,
         params.priority,
         params.service_time,
         params.event_name,
         params.recipient_name,
         params.alarm_message,
         alarm.normal,
         alarm.slow,
         alarm.very_slow,
         alarm.stall,
         alarm.error,
         alarm.date_time,
         convertDateToTimestamp(data.created_at)
      ]);

      if (query instanceof Error) {
         return query;
      }

      return query.rows[0];
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