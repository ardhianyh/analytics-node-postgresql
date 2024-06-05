import { Request, Response } from "express";
import { appDynamicRepository } from "../repositories";
import { IAppDynamics, IAppDynamicsAlert, IAppDynamicsParameters } from "../types";

const getAppDynamicsAlertId = (apiBody: IAppDynamics, alerts: IAppDynamicsAlert[]): Promise<string | undefined> => {

   const eventNameParam = apiBody.parameters.body.find(param => param.key === "5" && param.value === "event_name");

   if (eventNameParam) {
      const eventName = eventNameParam.value_text;
      const alert = alerts.find(alert => eventName.includes(alert.name));

      if (alert) {
         return Promise.resolve(alert.id);
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


export const InsertAppDynamicsController = async (
   req: Request,
   res: Response
): Promise<Response | void> => {

   const dataBody = req.body as IAppDynamics;
   const alerts = await appDynamicRepository.getAppDynamicsAlert();

   if (alerts instanceof Error) {
      return res.status(500).send(alerts.message)
   }

   if (!alerts) {
      return res.status(500).send('[getAppDynamicsAlert] Encountered error undefined');
   }

   const appsdynamics_alert_id = await getAppDynamicsAlertId(dataBody, alerts);
   if (!appsdynamics_alert_id) {
      return res.status(500).send('[getAppDynamicsAlertId] Encountered error when parsing the AppDynamicsAlert');
   }

   dataBody.appsdynamics_alert_id = appsdynamics_alert_id;
   const params: IAppDynamicsParameters = await getParamsFromAppDynamics(dataBody);

   const result = await appDynamicRepository.insertAppDynamics(dataBody, params);
   if (result instanceof Error) {
      return res.status(500).send(result.message)
   }

   return res.status(201).json(result);
}