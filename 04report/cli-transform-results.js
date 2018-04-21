/**
 * CLI to take postman json test results and flatten to csv.
 */


/**
 * Library to query json objects
 * https://github.com/dchester/jsonpath
 */
const jp = require('jsonpath');


/**
 * Converts a json object to csv
 * https://github.com/zemirco/json2csv
 */
const Json2csvParser = require('json2csv').Parser;

/**
 * flatten a json structure
 */
const flatten = require('flat');

/**
 * self explanatory
 * https://github.com/felixge/node-dateformat
 */
const dateFormat = require('dateformat');

//example report
const report = {
    "collection": {
        "_": {
            "postman_id": "c68550ac-8585-40d8-87e7-78596739f3b3"
        },
        "item": [
            {
                "id": "8ef87fce-2b4d-4166-911d-4c9d1f1df9a1",
                "name": "health-endpoint",
                "request": {
                    "url": {
                        "path": [
                            "health"
                        ],
                        "host": [
                            "{{apigw-root}}"
                        ],
                        "query": [],
                        "variable": []
                    },
                    "method": "GET",
                    "body": {}
                },
                "response": [],
                "event": [
                    {
                        "listen": "test",
                        "script": {
                            "id": "0e33f567-35c3-4f51-85c1-56b04cf2b676",
                            "type": "text/javascript",
                            "exec": [
                                "pm.test(\"Status code is 200\", function () {",
                                "    pm.response.to.have.status(200);",
                                "});",
                                "",
                                "var contentTypeHeaderExists = responseHeaders.hasOwnProperty(\"Content-Type\");",
                                " ",
                                "tests[\"Has Content-Type\"] = contentTypeHeaderExists;",
                                "",
                                "pm.test(\"Body matches string\", function () {",
                                "    pm.expect(pm.response.text()).to.include(\"v2.5\");",
                                "});"
                            ],
                            "_lastExecutionId": "fcec43b6-21ff-4088-9765-e9780de71637"
                        }
                    }
                ]
            },
            {
                "id": "9a043329-4b46-4c98-aed5-96b7a5e8127b",
                "name": "second function",
                "request": {
                    "url": {
                        "path": [
                            "two"
                        ],
                        "host": [
                            "{{apigw-root}}"
                        ],
                        "query": [],
                        "variable": []
                    },
                    "method": "GET",
                    "body": {}
                },
                "response": [],
                "event": [
                    {
                        "listen": "test",
                        "script": {
                            "id": "c33e1f30-b336-4b14-b1da-18e343b8c681",
                            "type": "text/javascript",
                            "exec": [
                                "pm.test(\"Status code is 200\", function () {",
                                "    pm.response.to.have.status(200);",
                                "});",
                                "",
                                "var contentTypeHeaderExists = responseHeaders.hasOwnProperty(\"Content-Type\");",
                                " ",
                                "tests[\"Has Content-Type\"] = contentTypeHeaderExists;",
                                "",
                                "pm.test(\"Body matches string\", function () {",
                                "    pm.expect(pm.response.text()).to.include(\"v1.1\");",
                                "});"
                            ],
                            "_lastExecutionId": "32e290b3-a7ab-464c-a1fd-09a1fcf1685c"
                        }
                    }
                ]
            }
        ],
        "event": [],
        "variable": [],
        "info": {
            "id": "c68550ac-8585-40d8-87e7-78596739f3b3",
            "name": "NewmanAPI",
            "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        }
    },
    "environment": {
        "_": {
            "postman_variable_scope": "environment",
            "postman_exported_at": "2018-04-07T02:06:15.238Z",
            "postman_exported_using": "Postman/6.0.10"
        },
        "id": "45c26232-a946-422e-a84b-ad72d2fc8aaf",
        "name": "newman-postman-environment",
        "values": [
            {
                "type": "any",
                "value": "https://sc36tg90pj.execute-api.us-east-1.amazonaws.com/Prod",
                "key": "apigw-root"
            }
        ]
    },
    "globals": {
        "id": "92c9672d-c8a2-45cf-abf7-998ab60022df",
        "values": []
    },
    "run": {
        "stats": {
            "iterations": {
                "total": 1,
                "pending": 0,
                "failed": 0
            },
            "items": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "scripts": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "prerequests": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "requests": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "tests": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "assertions": {
                "total": 6,
                "pending": 0,
                "failed": 0
            },
            "testScripts": {
                "total": 2,
                "pending": 0,
                "failed": 0
            },
            "prerequestScripts": {
                "total": 0,
                "pending": 0,
                "failed": 0
            }
        },
        "timings": {
            "responseAverage": 135,
            "started": 1523068810966,
            "completed": 1523068811319
        },
        "executions": [
            {
                "cursor": {
                    "position": 0,
                    "iteration": 0,
                    "length": 2,
                    "cycles": 1,
                    "empty": false,
                    "eof": false,
                    "bof": true,
                    "cr": false,
                    "ref": "3c837207-bb78-4f09-8482-f82a8aa2ca5f",
                    "httpRequestId": "b3eada78-e25c-4cc1-8582-0e1d6e878db2"
                },
                "item": {
                    "id": "8ef87fce-2b4d-4166-911d-4c9d1f1df9a1",
                    "name": "health-endpoint",
                    "request": {
                        "url": {
                            "path": [
                                "health"
                            ],
                            "host": [
                                "{{apigw-root}}"
                            ],
                            "query": [],
                            "variable": []
                        },
                        "method": "GET",
                        "body": {}
                    },
                    "response": [],
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "id": "0e33f567-35c3-4f51-85c1-56b04cf2b676",
                                "type": "text/javascript",
                                "exec": [
                                    "pm.test(\"Status code is 200\", function () {",
                                    "    pm.response.to.have.status(200);",
                                    "});",
                                    "",
                                    "var contentTypeHeaderExists = responseHeaders.hasOwnProperty(\"Content-Type\");",
                                    " ",
                                    "tests[\"Has Content-Type\"] = contentTypeHeaderExists;",
                                    "",
                                    "pm.test(\"Body matches string\", function () {",
                                    "    pm.expect(pm.response.text()).to.include(\"v2.5\");",
                                    "});"
                                ],
                                "_lastExecutionId": "fcec43b6-21ff-4088-9765-e9780de71637"
                            }
                        }
                    ]
                },
                "request": {
                    "url": {
                        "protocol": "https",
                        "path": [
                            "Prod",
                            "health"
                        ],
                        "host": [
                            "sc36tg90pj",
                            "execute-api",
                            "us-east-1",
                            "amazonaws",
                            "com"
                        ],
                        "query": [],
                        "variable": []
                    },
                    "header": [
                        {
                            "key": "User-Agent",
                            "value": "PostmanRuntime/7.1.3"
                        },
                        {
                            "key": "Accept",
                            "value": "*/*"
                        },
                        {
                            "key": "Host",
                            "value": "sc36tg90pj.execute-api.us-east-1.amazonaws.com"
                        },
                        {
                            "key": "accept-encoding",
                            "value": "gzip, deflate"
                        }
                    ],
                    "method": "GET",
                    "body": {}
                },
                "response": {
                    "id": "9f097db2-3214-4f97-b111-b0a42910e287",
                    "status": "OK",
                    "code": 200,
                    "header": [
                        {
                            "key": "Content-Type",
                            "value": "application/json"
                        },
                        {
                            "key": "Content-Length",
                            "value": "38"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Date",
                            "value": "Sat, 07 Apr 2018 02:39:44 GMT"
                        },
                        {
                            "key": "x-amzn-RequestId",
                            "value": "ee536009-3a0c-11e8-aaad-d5e850543dd1"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "x-amz-apigw-id",
                            "value": "E8xZnGE6IAMFvaA="
                        },
                        {
                            "key": "X-Amzn-Trace-Id",
                            "value": "sampled=0;root=1-5ac82f70-521ef5a0ce36069479c214cb"
                        },
                        {
                            "key": "Access-Control-Allow-Credentials",
                            "value": "true"
                        },
                        {
                            "key": "X-Cache",
                            "value": "Miss from cloudfront"
                        },
                        {
                            "key": "Via",
                            "value": "1.1 ffd1fa62fb3d5b958da33257c789bbbe.cloudfront.net (CloudFront)"
                        },
                        {
                            "key": "X-Amz-Cf-Id",
                            "value": "aJ1VkVhSJMkT7k3g42uAPa1QIeMREGP3mvf4g_4oNT99NzxlOQrpPA=="
                        }
                    ],
                    "stream": {
                        "type": "Buffer",
                        "data": [
                            123,
                            34,
                            109,
                            101,
                            115,
                            115,
                            97,
                            103,
                            101,
                            34,
                            58,
                            34,
                            83,
                            117,
                            99,
                            99,
                            101,
                            115,
                            115,
                            102,
                            117,
                            108,
                            32,
                            114,
                            101,
                            115,
                            112,
                            111,
                            110,
                            115,
                            101,
                            32,
                            118,
                            50,
                            46,
                            53,
                            34,
                            125
                        ]
                    },
                    "cookie": [],
                    "responseTime": 156,
                    "responseSize": 38
                },
                "id": "8ef87fce-2b4d-4166-911d-4c9d1f1df9a1",
                "assertions": [
                    {
                        "assertion": "Status code is 200"
                    },
                    {
                        "assertion": "Body matches string"
                    },
                    {
                        "assertion": "Has Content-Type"
                    }
                ]
            },
            {
                "cursor": {
                    "ref": "6b825922-5f07-4a47-a9a3-b78e6d0f6929",
                    "length": 2,
                    "cycles": 1,
                    "position": 1,
                    "iteration": 0,
                    "httpRequestId": "1f0e3deb-f1e9-4f87-a813-5e2ec5f7deed"
                },
                "item": {
                    "id": "9a043329-4b46-4c98-aed5-96b7a5e8127b",
                    "name": "second function",
                    "request": {
                        "url": {
                            "path": [
                                "two"
                            ],
                            "host": [
                                "{{apigw-root}}"
                            ],
                            "query": [],
                            "variable": []
                        },
                        "method": "GET",
                        "body": {}
                    },
                    "response": [],
                    "event": [
                        {
                            "listen": "test",
                            "script": {
                                "id": "c33e1f30-b336-4b14-b1da-18e343b8c681",
                                "type": "text/javascript",
                                "exec": [
                                    "pm.test(\"Status code is 200\", function () {",
                                    "    pm.response.to.have.status(200);",
                                    "});",
                                    "",
                                    "var contentTypeHeaderExists = responseHeaders.hasOwnProperty(\"Content-Type\");",
                                    " ",
                                    "tests[\"Has Content-Type\"] = contentTypeHeaderExists;",
                                    "",
                                    "pm.test(\"Body matches string\", function () {",
                                    "    pm.expect(pm.response.text()).to.include(\"v1.1\");",
                                    "});"
                                ],
                                "_lastExecutionId": "32e290b3-a7ab-464c-a1fd-09a1fcf1685c"
                            }
                        }
                    ]
                },
                "request": {
                    "url": {
                        "protocol": "https",
                        "path": [
                            "Prod",
                            "two"
                        ],
                        "host": [
                            "sc36tg90pj",
                            "execute-api",
                            "us-east-1",
                            "amazonaws",
                            "com"
                        ],
                        "query": [],
                        "variable": []
                    },
                    "header": [
                        {
                            "key": "User-Agent",
                            "value": "PostmanRuntime/7.1.3"
                        },
                        {
                            "key": "Accept",
                            "value": "*/*"
                        },
                        {
                            "key": "Host",
                            "value": "sc36tg90pj.execute-api.us-east-1.amazonaws.com"
                        },
                        {
                            "key": "accept-encoding",
                            "value": "gzip, deflate"
                        }
                    ],
                    "method": "GET",
                    "body": {}
                },
                "response": {
                    "id": "021e35bb-7610-4959-aed3-1c68207ff086",
                    "status": "OK",
                    "code": 200,
                    "header": [
                        {
                            "key": "Content-Type",
                            "value": "application/json"
                        },
                        {
                            "key": "Content-Length",
                            "value": "56"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Date",
                            "value": "Sat, 07 Apr 2018 02:39:44 GMT"
                        },
                        {
                            "key": "x-amzn-RequestId",
                            "value": "ee6672bc-3a0c-11e8-a048-219310587f0b"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "x-amz-apigw-id",
                            "value": "E8xZoGYfIAMFpKA="
                        },
                        {
                            "key": "X-Amzn-Trace-Id",
                            "value": "sampled=0;root=1-5ac82f70-9df67c64fb77b6e0bb21c44b"
                        },
                        {
                            "key": "Access-Control-Allow-Credentials",
                            "value": "true"
                        },
                        {
                            "key": "X-Cache",
                            "value": "Miss from cloudfront"
                        },
                        {
                            "key": "Via",
                            "value": "1.1 ffd1fa62fb3d5b958da33257c789bbbe.cloudfront.net (CloudFront)"
                        },
                        {
                            "key": "X-Amz-Cf-Id",
                            "value": "HFA0R-TgVXnmcDbmi7bG3HO6z1yQ4ulaMt1ulvmewxyoNZIXGvo9KA=="
                        }
                    ],
                    "stream": {
                        "type": "Buffer",
                        "data": [
                            123,
                            34,
                            109,
                            101,
                            115,
                            115,
                            97,
                            103,
                            101,
                            34,
                            58,
                            34,
                            83,
                            117,
                            99,
                            99,
                            101,
                            115,
                            115,
                            102,
                            117,
                            108,
                            32,
                            114,
                            101,
                            115,
                            112,
                            111,
                            110,
                            115,
                            101,
                            32,
                            102,
                            114,
                            111,
                            109,
                            32,
                            102,
                            117,
                            110,
                            99,
                            116,
                            105,
                            111,
                            110,
                            32,
                            116,
                            119,
                            111,
                            32,
                            118,
                            49,
                            46,
                            49,
                            34,
                            125
                        ]
                    },
                    "cookie": [],
                    "responseTime": 114,
                    "responseSize": 56
                },
                "id": "9a043329-4b46-4c98-aed5-96b7a5e8127b",
                "assertions": [
                    {
                        "assertion": "Status code is 200"
                    },
                    {
                        "assertion": "Body matches string"
                    },
                    {
                        "assertion": "Has Content-Type"
                    }
                ]
            }
        ],
        "transfers": {
            "responseTotal": 94
        },
        "failures": [],
        "error": null
    }
};

//extract the stats object from test results
let stats = jp.value(report, '$..stats');

//console.log("Stats:\n" + JSON.stringify(stats, null, 4));

//flatten stats object
let flatStats = flatten(stats, { delimiter: '_' });

//add report date and time
flatStats['report_date'] = dateFormat(new Date(), "yyyy/mm/dd");
flatStats['report_time'] = dateFormat(new Date(), "H:MM:ss");

//console.log(flatStats);

//define fields we want to extract from json object
const fields = [
    'report_date',
    'report_time',
    'iterations_total',
    'iterations_failed',
    'requests_total',
    'requests_failed',
    'items_total',
    'scripts_total'
];

//parse json and produce csv output
const json2csvParser = new Json2csvParser({ fields });
const csv = json2csvParser.parse(flatStats);

console.log(csv);