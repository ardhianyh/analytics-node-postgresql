export interface IAppDynamicsAlert {
   id: string;
   name: string;
}

type Parameter = {
   key: string;
   value: string;
   value_text: string;
};

export interface IAppDynamics {
   id?: string;
   appsdynamics_alert_id: string;
   to_number?: string;
   to_name?: string;
   channel_integration_id?: string;
   message_template_id?: string;
   language?: string;
   parameters: {
      body: Parameter[];
   };
}

export interface IAppDynamicsParameters {
   id?: string;
   appsdynamics_id: string;
   severity: string;
   app: string;
   priority: string;
   service_time: string;
   event_name: string;
   recipient_name: string;
   alarm_message: string;
}