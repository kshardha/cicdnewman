CREATE EXTERNAL TABLE `test_results`(
  `iterations_total` int ,
  `iterations_pending` int ,
  `iterations_failed` int ,
  `items_total` int ,
  `items_pending` int ,
  `items_failed` int ,
  `scripts_total` int ,
  `scripts_pending` int ,
  `scripts_failed` int ,
  `prerequests_total` int ,
  `prerequests_pending` int ,
  `prerequests_failed` int ,
  `requests_total` int ,
  `requests_pending` int ,
  `requests_failed` int ,
  `tests_total` int ,
  `tests_pending` int ,
  `tests_failed` int ,
  `assertions_total` int ,
  `assertions_pending` int ,
  `assertions_failed` int ,
  `testscripts_total` int ,
  `testscripts_pending` int ,
  `testscripts_failed` int ,
  `prerequestscripts_total` int ,
  `prerequestscripts_pending` int ,
  `prerequestscripts_failed` int ,
  `report_date` string ,
  `report_time` string )
ROW FORMAT SERDE
  'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  'paths'='assertions_failed,assertions_pending,assertions_total,items_failed,items_pending,items_total,iterations_failed,iterations_pending,iterations_total,prerequestScripts_failed,prerequestScripts_pending,prerequestScripts_total,prerequests_failed,prerequests_pending,prerequests_total,report_date,report_time,requests_failed,requests_pending,requests_total,scripts_failed,scripts_pending,scripts_total,testScripts_failed,testScripts_pending,testScripts_total,tests_failed,tests_pending,tests_total')
STORED AS INPUTFORMAT
  'org.apache.hadoop.mapred.TextInputFormat'
OUTPUTFORMAT
  'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat'
LOCATION
  's3://postman-newman/test-results/'
TBLPROPERTIES (
  'CrawlerSchemaDeserializerVersion'='1.0',
  'CrawlerSchemaSerializerVersion'='1.0',
  'UPDATED_BY_CRAWLER'='newman-results-crawler',
  'averageRecordSize'='628',
  'classification'='json',
  'compressionType'='none',
  'objectCount'='1',
  'recordCount'='1',
  'sizeKey'='628',
  'typeOfData'='file')