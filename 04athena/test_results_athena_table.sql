CREATE EXTERNAL TABLE IF NOT EXISTS <NAME_OF_ATHENA_DB>.<NAME_OF_ATHENA_TABLE> (
  `iterations_total` int,
  `iterations_pending` int,
  `iterations_failed` int,
  `items_total` int,
  `items_pending` int,
  `items_failed` int,
  `scripts_total` int,
  `scripts_pending` int,
  `scripts_failed` int,
  `prerequests_total` int,
  `prerequests_pending` int,
  `prerequests_failed` int,
  `requests_total` int,
  `requests_pending` int,
  `requests_failed` int,
  `tests_total` int,
  `tests_pending` int,
  `tests_failed` int,
  `assertions_total` int,
  `assertions_pending` int,
  `assertions_failed` int,
  `testscripts_total` int,
  `testscripts_pending` int,
  `testscripts_failed` int,
  `prerequestscripts_total` int,
  `prerequestscripts_pending` int,
  `prerequestscripts_failed` int,
  `api_id` string,
  `report_date` string,
  `report_time` string 
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  'serialization.format' = '1'
) LOCATION 's3://<S3_BUCKET_NAME/<TEST_RESULTS_PATH>/'
TBLPROPERTIES ('has_encrypted_data'=true);
