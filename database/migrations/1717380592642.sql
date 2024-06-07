CREATE OR REPLACE FUNCTION appsdynamics.get_appsdynamics(
   page_in INTEGER DEFAULT NULL,
   limit_in INTEGER DEFAULT NULL,
   severity_in VARCHAR(255) DEFAULT NULL,
   app_in VARCHAR(255) DEFAULT NULL,
   priority_in VARCHAR(255) DEFAULT NULL
)
RETURNS TABLE (
   id INTEGER,
   alert VARCHAR,
   severity VARCHAR,
   app VARCHAR,
   priority VARCHAR,
   service_time VARCHAR,
   event_name VARCHAR,
   recipient_name VARCHAR,
   alarm_message TEXT,
   normal VARCHAR,
   slow VARCHAR,
   very_slow VARCHAR,
   stall VARCHAR,
   error VARCHAR,
   date_time VARCHAR,
   klarifikasi VARCHAR,
   created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      a.id as id,
      a.alert AS alert,
      a.severity AS severity,
      a.app AS app,
      a.priority AS priority,
      a.service_time AS service_time,
      a.event_name AS event_name,
      a.recipient_name AS recipient_name,
      a.alarm_message AS alarm_message,
      a.normal AS normal,
      a.slow AS slow,
      a.very_slow AS very_slow,
      a.stall AS stall,
      a.error AS error,
      a.date_time AS date_time,
      a.klarifikasi AS klarifikasi,
      a.created_at AS created_at
   FROM appsdynamics.appsdynamics a
   WHERE (severity_in IS NULL OR a.severity ILIKE '%' || severity_in || '%')
   AND (app_in IS NULL OR a.app ILIKE '%' || app_in || '%')
   AND (priority_in IS NULL OR a.priority ILIKE '%' || priority_in || '%')
   ORDER BY a.created_at DESC
   LIMIT (limit_in)
   OFFSET (page_in * limit_in);
END;
$$;


CREATE OR REPLACE FUNCTION appsdynamics.insert_appsdynamics(
   alert_in VARCHAR(255) DEFAULT NULL,
   to_number_in VARCHAR(255) DEFAULT NULL,
   to_name_in VARCHAR(255) DEFAULT NULL,
   channel_integration_id_in VARCHAR(255) DEFAULT NULL,
   message_template_id_in VARCHAR(255) DEFAULT NULL,
   language_in VARCHAR(255) DEFAULT NULL,
   parameters_in JSON DEFAULT NULL,
   alarm_in JSON DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
   inserted_appsdynamics_id UUID;
BEGIN
   INSERT INTO appsdynamics.appsdynamics(
      alert,
      to_number,
      to_name,
      channel_integration_id,
      message_template_id,
      language,
      severity,
      app,
      priority,
      service_time,
      event_name,
      recipient_name,
      alarm_message,
      normal,
      slow,
      very_slow,
      stall,
      error,
      date_time
   ) VALUES (
      alert_in,
      to_number_in,
      to_name_in,
      channel_integration_id_in,
      message_template_id_in,
      language_in,
      parameters_in->>'severity',
      parameters_in->>'app',
      parameters_in->>'priority',
      parameters_in->>'service_time',
      parameters_in->>'event_name',
      parameters_in->>'recipient_name',
      parameters_in->>'alarm_message',
      alarm_in->>'normal',
      alarm_in->>'slow',
      alarm_in->>'very_slow',
      alarm_in->>'stall',
      alarm_in->>'error',
      alarm_in->>'date_time'
   );
END;
$$;

CREATE OR REPLACE FUNCTION appsdynamics.get_chart(
   alert_in VARCHAR(255) DEFAULT NULL,
   limit_in INTEGER DEFAULT NULL,
   start_date_in DATE DEFAULT NULL,
   end_date_in DATE DEFAULT NULL,
   month_in TEXT DEFAULT NULL,
   year_in TEXT DEFAULT NULL
)
RETURNS TABLE (
   app VARCHAR,
   total BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      a.app as app, 
      COUNT(a.app) AS total
   FROM appsdynamics.appsdynamics a
   WHERE (alert_in IS NULL OR a.alert = alert_in)
   AND LOWER(a.severity) != 'info'
   AND (
	   (start_date_in IS NULL AND end_date_in IS NULL) OR 
	   (DATE(a.created_at) BETWEEN start_date_in AND end_date_in)
   )
   AND (month_in IS NULL OR TO_CHAR(a.created_at, 'YYYY-MM') = month_in)
   AND (year_in IS NULL OR TO_CHAR(a.created_at, 'YYYY') = year_in)
   GROUP BY a.app
   ORDER BY total DESC
   LIMIT limit_in;
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
   id INTEGER,
   alert VARCHAR,
   severity VARCHAR,
   layanan VARCHAR,
   priority VARCHAR,
   service_time VARCHAR,
   ip_address VARCHAR,
   node_name VARCHAR,
   klarifikasi VARCHAR,
   created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      ss.id AS id,
      ss.alert AS alert,
      ss.severity AS severity,
      ss.layanan AS layanan,
      ss.priority AS priority,
      ss.service_time AS service_time,
      ss.ip_address AS ip_address,
      ss.node_name AS node_name,
      ss.klarifikasi AS klarifikasi,
      ss.created_at AS created_at
   FROM solarwinds.solarwinds ss
   WHERE (severity_in IS NULL OR ss.severity ILIKE '%' || severity_in || '%')
   AND (layanan_in IS NULL OR ss.layanan ILIKE '%' || layanan_in || '%')
   AND (priority_in IS NULL OR ss.priority ILIKE '%' || priority_in || '%')
   ORDER BY ss.created_at DESC
   LIMIT (limit_in)
   OFFSET (page_in * limit_in);
END;
$$;


CREATE OR REPLACE FUNCTION solarwinds.get_chart(
   alert_in VARCHAR(255) DEFAULT NULL,
   limit_in INTEGER DEFAULT NULL,
   start_date_in DATE DEFAULT NULL,
   end_date_in DATE DEFAULT NULL,
   month_in TEXT DEFAULT NULL,
   year_in TEXT DEFAULT NULL
)
RETURNS TABLE (
   layanan VARCHAR,
   total BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT 
      ss.layanan as layanan, 
      COUNT(ss.layanan) AS total
   FROM solarwinds.solarwinds ss
   WHERE (alert_in IS NULL OR ss.alert = alert_in)
   AND LOWER(ss.severity) != 'info'
   AND (
	   (start_date_in IS NULL AND end_date_in IS NULL) OR 
	   (DATE(ss.created_at) BETWEEN start_date_in AND end_date_in)
   )
   AND (month_in IS NULL OR TO_CHAR(ss.created_at, 'YYYY-MM') = month_in)
   AND (year_in IS NULL OR TO_CHAR(ss.created_at, 'YYYY') = year_in)
   GROUP BY ss.layanan
   ORDER BY total DESC
   LIMIT limit_in;
END;
$$;