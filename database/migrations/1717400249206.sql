INSERT INTO appsdynamics.appsdynamics_alert (name)
SELECT 'AppDynamics_Alert_1' UNION
SELECT 'AppDynamics_Alert_2'
ON CONFLICT DO NOTHING;


INSERT INTO solarwinds.solarwinds_alert (name)
SELECT 'Disk Alert' UNION
SELECT 'Memory CPU Alert'
ON CONFLICT DO NOTHING;