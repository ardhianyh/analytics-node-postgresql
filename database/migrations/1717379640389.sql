CREATE TABLE public.appsdynamics (
  id SERIAL PRIMARY KEY, /* 4 bytes; 1 to 2.147.483.647 */
  alert VARCHAR(255) NULL,
  to_number VARCHAR(255) NULL,
  to_name VARCHAR(255) NULL,
  channel_integration_id VARCHAR(255) NULL,
  message_template_id VARCHAR(255) NULL,
  language VARCHAR(255) NULL,
  severity VARCHAR(255) NULL,
  app VARCHAR(255) NULL,
  priority VARCHAR(255) NULL,
  service_time VARCHAR(255) NULL,
  event_name VARCHAR(255) NULL,
  recipient_name VARCHAR(255) NULL,
  alarm_message TEXT NULL,
  normal VARCHAR(255) NULL,
  slow VARCHAR(255) NULL,
  very_slow VARCHAR(255) NULL,
  stall VARCHAR(255) NULL,
  error VARCHAR(255) NULL,
  date_time VARCHAR(255) NULL,
  klarifikasi VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appdynamics_app ON public.appsdynamics(app);
CREATE INDEX idx_appdynamics_alert ON public.appsdynamics(alert);
CREATE INDEX idx_appdynamics_severity ON public.appsdynamics(severity);
CREATE INDEX idx_appdynamics_created_at ON public.appsdynamics(created_at);

CREATE TABLE public.solarwinds (
  id SERIAL PRIMARY KEY,  /* 4 bytes; 1 to 2.147.483.647 */
  alert VARCHAR(255) NULL,
  severity VARCHAR(255) NULL,
  layanan VARCHAR(255) NULL,
  priority VARCHAR(255) NULL,
  service_time VARCHAR(255) NULL,
  ip_address VARCHAR(255) NULL,
  node_name VARCHAR(255) NULL,
  percent_disk_used VARCHAR(255) NULL,
  disk_used VARCHAR(255) NULL,
  cpu_load VARCHAR(255) NULL,
  memory_used VARCHAR(255) NULL,
  total_cpu_count VARCHAR(255) NULL,
  total_memory VARCHAR(255) NULL,
  os VARCHAR(255) NULL,
  klarifikasi VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_solarwinds_layanan ON public.solarwinds(layanan);
CREATE INDEX idx_solarwinds_alert ON public.solarwinds(alert);
CREATE INDEX idx_solarwinds_severity ON public.solarwinds(severity);
CREATE INDEX idx_solarwinds_created_at ON public.solarwinds(created_at);

CREATE TABLE public.chart (
  alert VARCHAR(255) NULL,
  layanan VARCHAR(255) NULL,
  severity VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chart_layanan ON public.chart(layanan);
CREATE INDEX idx_chart_alert ON public.chart(alert);
CREATE INDEX idx_chart_severity ON public.chart(severity);
CREATE INDEX idx_chart_created_at ON public.chart(created_at);