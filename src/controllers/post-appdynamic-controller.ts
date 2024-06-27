import { Request, Response } from "express";
import { appDynamicRepository, chartRepository } from "../repositories";
import { IAppDynamicAlarmMessage, IAppDynamics, IAppDynamicsAlert, IAppDynamicsParameters } from "../types";
import { IChart } from "../types/chart";

const getAppDynamicsAlertName = (apiBody: IAppDynamics, alerts: IAppDynamicsAlert[]): Promise<string | undefined> => {

   const eventNameParam = apiBody.parameters.body.find(param => param.key === "5" && param.value === "event_name");

   if (eventNameParam) {
      const eventName = eventNameParam.value_text;
      const alert = alerts.find(alert => eventName.includes(alert.name));

      if (alert) {
         return Promise.resolve(alert.name);
      }
   }

   return Promise.resolve(undefined);
}

const removeSpecialCharsFirstAndLast = (input: string): string => {
   const removeSpecialChars = (word: string): string => {
      return word.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
   };

   const words = input.split(' ');
   if (words.length > 0) {
      words[0] = removeSpecialChars(words[0]);
   }
   if (words.length > 1) {
      words[words.length - 1] = removeSpecialChars(words[words.length - 1]);
   }
   return words.join(' ');
}

const getParamsFromAppDynamics = async (data: IAppDynamics): Promise<IAppDynamicsParameters> => {
   const params: Partial<IAppDynamicsParameters> = {};

   data.parameters.body.forEach(param => {
      switch (param.value) {
         case "severity":
            params.severity = removeSpecialCharsFirstAndLast(param.value_text);
            break;
         case "app":
            params.app = removeSpecialCharsFirstAndLast(param.value_text);
            break;
         case "priority":
            params.priority = removeSpecialCharsFirstAndLast(param.value_text);
            break;
         case "service_time":
            params.service_time = removeSpecialCharsFirstAndLast(param.value_text);
            break;
         case "event_name":
            params.event_name = param.value_text;
            break;
         case "recipient_name":
            params.recipient_name = param.value_text;
            break;
         case "alarm_message":
            params.alarm_message = param.value_text;
            break;
      }
   });

   return params as IAppDynamicsParameters;
};

const parseStringToAlarmMessage = async (input: string): Promise<IAppDynamicAlarmMessage> => {
   const alarmMessage: IAppDynamicAlarmMessage = {};

   const patterns = {
      normal: /Normal\s*:(.*?);/i,
      slow: /Slow\s*:(.*?);/i,
      very_slow: /Very Slow\s*:(.*?);/i,
      stall: /Stall\s*:(.*?);/i,
      error: /Error\s*:(.*?);/i,
      date_time: /Time\s*:(.*?);/i
   };

   for (const key in patterns) {
      const regex = patterns[key as keyof typeof patterns];
      const match = input.match(regex);
      if (match) {
         alarmMessage[key as keyof IAppDynamicAlarmMessage] = match[1].trim();
      }
   }

   return alarmMessage;
}


export const InsertAppDynamicsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const dataBody = req.body as IAppDynamics;
   const alerts: IAppDynamicsAlert[] = [{
      name: 'AppDynamics_Alert_1',
   }, {
      name: 'AppDynamics_Alert_2'
   }];

   const appsdynamics_alert_name = await getAppDynamicsAlertName(dataBody, alerts);
   if (!appsdynamics_alert_name) {
      return res.status(500).send('[getAppDynamicsAlertName] Encountered error when parsing the AppDynamicsAlert');
   }

   dataBody.alert = appsdynamics_alert_name;
   const params: IAppDynamicsParameters = await getParamsFromAppDynamics(dataBody);

   let alarm: IAppDynamicAlarmMessage = {};
   if (appsdynamics_alert_name === "AppDynamics_Alert_1") {
      alarm = await parseStringToAlarmMessage(params.alarm_message);
   }

   const result = await appDynamicRepository.insertAppDynamics(dataBody, params, alarm);
   if (result instanceof Error) {
      return res.status(500).send(result.message)
   }

   const chart: IChart = {
      alert: result.alert,
      layanan: params.app,
      severity: params.severity,
      created_at: result.created_at
   }

   const insertChart = await chartRepository.insertChart(chart);
   if (insertChart instanceof Error) {
      return res.status(500).send(insertChart.message);
   }

   return res.status(201).json({ appdynamics: result, chart: insertChart });
}