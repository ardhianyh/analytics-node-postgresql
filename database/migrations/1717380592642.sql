CREATE OR REPLACE FUNCTION public.get_appsdynamics(
   limit_in INTEGER DEFAULT NULL,
   layanan_in VARCHAR(255) DEFAULT NULL,
   start_date_in DATE DEFAULT NULL,
   end_date_in DATE DEFAULT NULL,
   month_in TEXT DEFAULT NULL,
   year_in TEXT DEFAULT NULL,
   start_time_in TIME DEFAULT NULL,
   end_time_in TIME DEFAULT NULL
)
RETURNS TABLE (
   id INTEGER,
   alert VARCHAR,
   to_number VARCHAR,
   to_name VARCHAR,
   channel_integration_id VARCHAR,
   message_template_id VARCHAR,
   language VARCHAR,
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
   SELECT * FROM public.appsdynamics a
   WHERE (layanan_in IS NULL OR a.app ILIKE '%' || layanan_in || '%')
   AND (
       (start_date_in IS NULL AND end_date_in IS NULL) OR 
       (DATE(a.created_at) BETWEEN start_date_in AND end_date_in)
   )
   AND (
       (start_time_in IS NULL AND end_time_in IS NULL) OR 
       (SELECT a.created_at::time(0) BETWEEN start_time_in AND end_time_in)
   )
   AND (month_in IS NULL OR TO_CHAR(a.created_at, 'YYYY-MM') = month_in)
   AND (year_in IS NULL OR TO_CHAR(a.created_at, 'YYYY') = year_in)
   ORDER BY a.created_at DESC
   LIMIT limit_in;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_solarwinds(
   limit_in INTEGER DEFAULT NULL,
   layanan_in VARCHAR(255) DEFAULT NULL,
   start_date_in DATE DEFAULT NULL,
   end_date_in DATE DEFAULT NULL,
   month_in TEXT DEFAULT NULL,
   year_in TEXT DEFAULT NULL,
   start_time_in TIME DEFAULT NULL,
   end_time_in TIME DEFAULT NULL
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
   percent_disk_used VARCHAR,
   disk_used VARCHAR,
   cpu_load VARCHAR,
   memory_used VARCHAR,
   total_cpu_count VARCHAR,
   total_memory VARCHAR,
   os VARCHAR,
   klarifikasi VARCHAR,
   created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
DECLARE
BEGIN
   RETURN QUERY
   SELECT * FROM public.solarwinds ss
   WHERE (layanan_in IS NULL OR ss.layanan ILIKE '%' || layanan_in || '%')
   AND (
       (start_date_in IS NULL AND end_date_in IS NULL) OR 
       (DATE(ss.created_at) BETWEEN start_date_in AND end_date_in)
   )
   AND (
       (start_time_in IS NULL AND end_time_in IS NULL) OR 
       (SELECT ss.created_at::time(0) BETWEEN start_time_in AND end_time_in)
   )
   AND (month_in IS NULL OR TO_CHAR(ss.created_at, 'YYYY-MM') = month_in)
   AND (year_in IS NULL OR TO_CHAR(ss.created_at, 'YYYY') = year_in)
   ORDER BY ss.created_at DESC
   LIMIT limit_in;
END;
$$;


CREATE OR REPLACE FUNCTION public.get_chart(
   limit_in INTEGER DEFAULT NULL,
   start_date_in DATE DEFAULT NULL,
   end_date_in DATE DEFAULT NULL,
   month_in TEXT DEFAULT NULL,
   year_in TEXT DEFAULT NULL,
   start_time_in TIME DEFAULT NULL,
   end_time_in TIME DEFAULT NULL
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
      c.layanan AS layanan, 
      COUNT(c.layanan) AS total
   FROM public.chart c
   WHERE LOWER(c.severity) != 'info'
   AND (
       (start_date_in IS NULL AND end_date_in IS NULL) OR 
       (DATE(c.created_at) BETWEEN start_date_in AND end_date_in)
   )
   AND (
       (start_time_in IS NULL AND end_time_in IS NULL) OR 
       (SELECT c.created_at::time(0) BETWEEN start_time_in AND end_time_in)
   )
   AND (month_in IS NULL OR TO_CHAR(c.created_at, 'YYYY-MM') = month_in)
   AND (year_in IS NULL OR TO_CHAR(c.created_at, 'YYYY') = year_in)
   GROUP BY c.layanan
   ORDER BY total DESC
   LIMIT limit_in;
END;
$$;
