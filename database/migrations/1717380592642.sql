CREATE OR REPLACE FUNCTION appsdynamics.get_appsdynamics(
   page_in INTEGER DEFAULT NULL,
   limit_in INTEGER DEFAULT NULL,
   severity_in VARCHAR(255) DEFAULT NULL,
   app_in VARCHAR(255) DEFAULT NULL,
   priority_in VARCHAR(255) DEFAULT NULL
)
RETURNS TABLE (
   appsdynamics_id UUID,
   alert VARCHAR,
   severity VARCHAR,
   app VARCHAR,
   priority VARCHAR,
   service_time VARCHAR,
   event_name VARCHAR,
   recipient_name VARCHAR,
   alarm_message TEXT,
   created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      a.id AS appsdynamics_id,
      aa.name AS alert,
      ap.severity AS severity,
      ap.app AS app,
      ap.priority AS priority,
      ap.service_time AS service_time,
      ap.event_name AS event_name,
      ap.recipient_name AS recipient_name,
      ap.alarm_message AS alarm_message,
      a.created_at AS created_at
   FROM appsdynamics.appsdynamics a
   JOIN appsdynamics.appsdynamics_alert aa ON aa.id = a.appsdynamics_alert_id
   LEFT JOIN appsdynamics.appsdynamics_parameters ap ON ap.appsdynamics_id = a.id
   WHERE (severity_in IS NULL OR ap.severity ILIKE '%' || severity_in || '%')
   AND (app_in IS NULL OR ap.app ILIKE '%' || app_in || '%')
   AND (priority_in IS NULL OR ap.priority ILIKE '%' || priority_in || '%')
   LIMIT (limit_in)
   OFFSET (page_in * limit_in);
END;
$$;


CREATE OR REPLACE FUNCTION appsdynamics.insert_appsdynamics(
   appsdynamics_alert_id_in UUID,
   to_number_in VARCHAR(255) DEFAULT NULL,
   to_name_in VARCHAR(255) DEFAULT NULL,
   channel_integration_id_in VARCHAR(255) DEFAULT NULL,
   message_template_id_in VARCHAR(255) DEFAULT NULL,
   language_in VARCHAR(255) DEFAULT NULL,
   parameters_in JSON DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
   inserted_appsdynamics_id UUID;
BEGIN
   INSERT INTO appsdynamics.appsdynamics(
      appsdynamics_alert_id,
      to_name,
      to_number,
      channel_integration_id,
      message_template_id,
      language
   ) VALUES (
      appsdynamics_alert_id_in,
      to_number_in,
      to_name_in,
      channel_integration_id_in,
      message_template_id_in,
      language_in
   ) RETURNING id INTO inserted_appsdynamics_id;

   INSERT INTO appsdynamics.appsdynamics_parameters(
      appsdynamics_id,
      severity,
      app,
      priority,
      service_time,
      event_name,
      recipient_name,
      alarm_message
   ) VALUES (
      inserted_appsdynamics_id,
      parameters_in->>'severity',
      parameters_in->>'app',
      parameters_in->>'priority',
      parameters_in->>'service_time',
      parameters_in->>'event_name',
      parameters_in->>'recipient_name',
      parameters_in->>'alarm_message'
   );

   RETURN inserted_appsdynamics_id;
END;
$$;


CREATE OR REPLACE FUNCTION solarwinds.get_solarwinds(
   page_in INTEGER DEFAULT NULL,
   limit_in INTEGER DEFAULT NULL,
   severity_in VARCHAR(255) DEFAULT NULL,
   layanan_in VARCHAR(255) DEFAULT NULL,
   priority_in VARCHAR(255) DEFAULT NULL
)
RETURNS TABLE (
   alert VARCHAR,
   severity VARCHAR,
   layanan VARCHAR,
   priority VARCHAR,
   service_time VARCHAR,
   ip_address VARCHAR,
   node_name VARCHAR,
   created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      ss.alert AS alert,
      ss.severity AS severity,
      ss.layanan AS layanan,
      ss.priority AS priority,
      ss.service_time AS service_time,
      ss.ip_address AS ip_address,
      ss.node_name AS node_name,
      ss.created_at AS created_at
   FROM solarwinds.solarwinds ss
   WHERE (severity_in IS NULL OR ss.severity ILIKE '%' || severity_in || '%')
   AND (layanan_in IS NULL OR ss.layanan ILIKE '%' || layanan_in || '%')
   AND (priority_in IS NULL OR ss.priority ILIKE '%' || priority_in || '%')
   LIMIT (limit_in)
   OFFSET (page_in * limit_in);
END;
$$;