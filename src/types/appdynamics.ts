export interface IAppDynamicsAlert {
   name: string;
}

type Parameter = {
   key: string;
   value: string;
   value_text: string;
};

export interface IAppDynamics {
   alert: string;
   to_number?: string;
   to_name?: string;
   channel_integration_id?: string;
   message_template_id?: string;
   language?: string;
   parameters: {
      body: Parameter[];
   };
   alarm?: IAppDynamicAlarmMessage;
   klarifikasi: string;
}

export interface IAppDynamicsParameters {
   appsdynamics_id: string;
   severity: string;
   app: string;
   priority: string;
   service_time: string;
   event_name: string;
   recipient_name: string;
   alarm_message: string;
}

export interface IAppDynamicAlarmMessage {
   normal?: string;
   slow?: string;
   very_slow?: string;
   stall?: string;
   error?: string;
   date_time?: string;
}