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