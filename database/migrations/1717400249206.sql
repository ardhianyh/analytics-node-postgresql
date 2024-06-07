INSERT INTO appsdynamics.appsdynamics_alert (name)
SELECT 'AppDynamics_Alert_1' UNION
SELECT 'AppDynamics_Alert_2'
ON CONFLICT DO NOTHING;