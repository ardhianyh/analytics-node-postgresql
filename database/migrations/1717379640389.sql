CREATE TABLE appsdynamics.appsdynamics_alert (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);


CREATE TABLE appsdynamics.appsdynamics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appsdynamics_alert_id UUID NOT NULL,
  to_number VARCHAR(255) NULL,
  to_name VARCHAR(255) NULL,
  channel_integration_id VARCHAR(255) NULL,
  message_template_id VARCHAR(255) NULL,
  language VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appsdynamics.appsdynamics_parameters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appsdynamics_id UUID NOT NULL,
  severity VARCHAR(255) NULL,
  app VARCHAR(255) NULL,
  priority VARCHAR(255) NULL,
  service_time VARCHAR(255) NULL,
  event_name VARCHAR(255) NULL,
  recipient_name VARCHAR(255) NULL,
  alarm_message TEXT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE solarwinds.solarwinds_alert(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE solarwinds.solarwinds (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  alert VARCHAR(255) NULL,
  severity VARCHAR(255) NULL,
  layanan VARCHAR(255) NULL,
  priority VARCHAR(255) NULL,
  service_time VARCHAR(255) NULL,
  ip_address VARCHAR(255) NULL,
  node_name VARCHAR(255) NULL,
  percent_disk_used VARCHAR(255) NULL,
  disk_used VARCHAR(255) NULL,
  memory_used VARCHAR(255) NULL,
  total_cpu_count VARCHAR(255) NULL,
  total_memory VARCHAR(255) NULL,
  os VARCHAR(255) NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


