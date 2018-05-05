-- https://docs.aws.amazon.com/athena/latest/ug/csv.html


-- create external table
-- out test results are in csv
--
CREATE EXTERNAL TABLE myopencsvtable (
   iterations_total int,
   items_total int,
   scripts_total int
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
WITH SERDEPROPERTIES (
   'separatorChar' = ',',
   'quoteChar' = '\"',
   'escapeChar' = '\\'
   )
STORED AS TEXTFILE
LOCATION 's3://athena-test-input/';




CREATE EXTERNAL TABLE impressions (
    requestbegintime string,
    adid string,
    impressionid string,
    referrer string,
    useragent string,
    usercookie string,
    ip string,
    number string,
    processid string,
    browsercookie string,
    requestendtime string,

    threadid string,
    hostname string,
    sessionid string
)
ROW FORMAT  serde 'org.apache.hive.hcatalog.data.JsonSerDe'
with serdeproperties ( 'paths'='requestbegintime, adid, impressionid, referrer, useragent, usercookie, ip' )
LOCATION 's3://myregion.elasticmapreduce/samples/hive-ads/tables/impressions';





CREATE EXTERNAL TABLE `test_results`(
  `iterations_total` int COMMENT 'from deserializer',
  `iterations_pending` int COMMENT 'from deserializer',
  `iterations_failed` int COMMENT 'from deserializer',
  `items_total` int COMMENT 'from deserializer',
  `items_pending` int COMMENT 'from deserializer',
  `items_failed` int COMMENT 'from deserializer',
  `scripts_total` int COMMENT 'from deserializer',
  `scripts_pending` int COMMENT 'from deserializer',
  `scripts_failed` int COMMENT 'from deserializer',
  `prerequests_total` int COMMENT 'from deserializer',
  `prerequests_pending` int COMMENT 'from deserializer',
  `prerequests_failed` int COMMENT 'from deserializer',
  `requests_total` int COMMENT 'from deserializer',
  `requests_pending` int COMMENT 'from deserializer',
  `requests_failed` int COMMENT 'from deserializer',
  `tests_total` int COMMENT 'from deserializer',
  `tests_pending` int COMMENT 'from deserializer',
  `tests_failed` int COMMENT 'from deserializer',
  `assertions_total` int COMMENT 'from deserializer',
  `assertions_pending` int COMMENT 'from deserializer',
  `assertions_failed` int COMMENT 'from deserializer',
  `testscripts_total` int COMMENT 'from deserializer',
  `testscripts_pending` int COMMENT 'from deserializer',
  `testscripts_failed` int COMMENT 'from deserializer',
  `prerequestscripts_total` int COMMENT 'from deserializer',
  `prerequestscripts_pending` int COMMENT 'from deserializer',
  `prerequestscripts_failed` int COMMENT 'from deserializer',
  `report_date` string COMMENT 'from deserializer',
  `report_time` string COMMENT 'from deserializer')
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




-- count of failed tests