const jp = require('jsonpath');
const Json2csvParser = require('json2csv').Parser;

//https://github.com/zemirco/json2csv

const report = {
    "collection": {
        "_": {
            "postman_id": "c68550ac-8585-40d8-87e7-78596739f3b3"
        },
        "item": [
            {
                "id": "f9e7ea68-536a-402a-b6d0-74718adfa3a1",
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
                    "body": {
                        "mode": "raw",
                        "raw": ""
                    }
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
                            "_lastExecutionId": "d5096bdd-d06f-425d-a3f0-65ded978f969"
                        }
                    }
                ]
            },
            {
                "id": "322ddb10-daf3-46c1-afbd-59c3050d113b",
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
                            "id": "e960807b-f4df-4532-819e-1d2c50625b2e",
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
                            "_lastExecutionId": "575ebbd5-f09a-4eef-8008-0d68a5405d79"
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
            "postman_exported_at": "2018-03-24T14:13:01.156Z",
            "postman_exported_using": "Postman/6.0.10"
        },
        "id": "45c26232-a946-422e-a84b-ad72d2fc8aaf",
        "name": "newman-postman-environment",
        "values": [
            {
                "type": "any",
                "value": "https://6if03ew4we.execute-api.us-east-1.amazonaws.com/Prod",
                "key": "apigw-root"
            }
        ]
    },
    "globals": {
        "id": "0dc88e0f-66b8-41d0-9fdc-abb50e591155",
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
                "failed": 1
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
            "responseAverage": 110,
            "started": 1521900957479,
            "completed": 1521900957818
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
                    "ref": "1886cd83-3749-4806-a8a0-7af2ea8ad4ef",
                    "httpRequestId": "347dcdd4-a9e2-4c53-9bd2-65e2f70a478b"
                },
                "item": {
                    "id": "f9e7ea68-536a-402a-b6d0-74718adfa3a1",
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
                        "body": {
                            "mode": "raw",
                            "raw": ""
                        }
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
                                "_lastExecutionId": "d5096bdd-d06f-425d-a3f0-65ded978f969"
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
                            "6if03ew4we",
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
                            "value": "6if03ew4we.execute-api.us-east-1.amazonaws.com"
                        },
                        {
                            "key": "accept-encoding",
                            "value": "gzip, deflate"
                        }
                    ],
                    "method": "GET",
                    "body": {
                        "mode": "raw",
                        "raw": ""
                    }
                },
                "response": {
                    "id": "0e79009f-ef60-49f9-aca7-e50e5a93c4b0",
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
                            "value": "Sat, 24 Mar 2018 14:15:56 GMT"
                        },
                        {
                            "key": "x-amzn-RequestId",
                            "value": "de39f193-2f6d-11e8-b684-4d8db5642536"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "x-amz-apigw-id",
                            "value": "EQOQZHR_IAMF1Dw="
                        },
                        {
                            "key": "X-Amzn-Trace-Id",
                            "value": "sampled=0;root=1-5ab65d9c-4e15ee307b480c0fad864647"
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
                            "value": "1.1 3fde21c07022d5a0a6d5c2e220c1ce8f.cloudfront.net (CloudFront)"
                        },
                        {
                            "key": "X-Amz-Cf-Id",
                            "value": "j19DMJGnIkEbhk1u5A5crJ9yBAlbm3Mmcv-igogs2jJqxVH57Jpnfw=="
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
                    "responseTime": 172,
                    "responseSize": 38
                },
                "id": "f9e7ea68-536a-402a-b6d0-74718adfa3a1",
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
                    "ref": "5c221894-469a-4dd5-9f68-e2a3602a3c33",
                    "length": 2,
                    "cycles": 1,
                    "position": 1,
                    "iteration": 0,
                    "httpRequestId": "34e5b070-b356-4e0e-9f3a-d778361b92e3"
                },
                "item": {
                    "id": "322ddb10-daf3-46c1-afbd-59c3050d113b",
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
                                "id": "e960807b-f4df-4532-819e-1d2c50625b2e",
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
                                "_lastExecutionId": "575ebbd5-f09a-4eef-8008-0d68a5405d79"
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
                            "6if03ew4we",
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
                            "value": "6if03ew4we.execute-api.us-east-1.amazonaws.com"
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
                    "id": "f1fd47d3-a964-4dcb-863b-f16d5ce6ab75",
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
                            "value": "Sat, 24 Mar 2018 14:15:56 GMT"
                        },
                        {
                            "key": "x-amzn-RequestId",
                            "value": "de4bcb1a-2f6d-11e8-9b64-3177741f8edf"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "x-amz-apigw-id",
                            "value": "EQOQaEqOIAMFodQ="
                        },
                        {
                            "key": "X-Amzn-Trace-Id",
                            "value": "sampled=0;root=1-5ab65d9c-ac81c5324fbe3c5b32b6627d"
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
                            "value": "1.1 3fde21c07022d5a0a6d5c2e220c1ce8f.cloudfront.net (CloudFront)"
                        },
                        {
                            "key": "X-Amz-Cf-Id",
                            "value": "X6ckf1_vM2J2Ez_aJfMFQNoyorxrIsW7WmiB4pBL_FXz2uN2oV7Tqg=="
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
                            48,
                            34,
                            125
                        ]
                    },
                    "cookie": [],
                    "responseTime": 48,
                    "responseSize": 56
                },
                "id": "322ddb10-daf3-46c1-afbd-59c3050d113b",
                "assertions": [
                    {
                        "assertion": "Status code is 200"
                    },
                    {
                        "assertion": "Body matches string",
                        "error": {
                            "name": "AssertionError",
                            "index": 1,
                            "message": "expected '{\"message\":\"Successful response from function two v1.0\"}' to include 'v2.5'",
                            "stack": "AssertionError: expected '{\"message\":\"Successful response from function two v1.0\"}' to include 'v2.5'\n   at Object.eval sandbox-script.js:2:2)"
                        }
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
        "failures": [
            {
                "error": {
                    "name": "AssertionError",
                    "index": 1,
                    "message": "expected '{\"message\":\"Successful response from function two v1.0\"}' to include 'v2.5'",
                    "stack": "AssertionError: expected '{\"message\":\"Successful response from function two v1.0\"}' to include 'v2.5'\n   at Object.eval sandbox-script.js:2:2)",
                    "checksum": "6c32d4c308112a491ee2ffd485f3d21c",
                    "id": "4e818642-5f0b-4551-915f-830baa56f20c",
                    "timestamp": 1521900957811,
                    "stacktrace": [
                        {
                            "fileName": "sandbox-script.js",
                            "lineNumber": 2,
                            "functionName": "Object.eval",
                            "typeName": "Object",
                            "methodName": "eval",
                            "columnNumber": 2,
                            "native": false
                        }
                    ]
                },
                "at": "assertion:1 in test-script",
                "source": {
                    "id": "322ddb10-daf3-46c1-afbd-59c3050d113b",
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
                                "id": "e960807b-f4df-4532-819e-1d2c50625b2e",
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
                                "_lastExecutionId": "575ebbd5-f09a-4eef-8008-0d68a5405d79"
                            }
                        }
                    ]
                },
                "parent": {
                    "_": {
                        "postman_id": "c68550ac-8585-40d8-87e7-78596739f3b3"
                    },
                    "item": [
                        {
                            "id": "f9e7ea68-536a-402a-b6d0-74718adfa3a1",
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
                                "body": {
                                    "mode": "raw",
                                    "raw": ""
                                }
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
                                        "_lastExecutionId": "d5096bdd-d06f-425d-a3f0-65ded978f969"
                                    }
                                }
                            ]
                        },
                        {
                            "id": "322ddb10-daf3-46c1-afbd-59c3050d113b",
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
                                        "id": "e960807b-f4df-4532-819e-1d2c50625b2e",
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
                                        "_lastExecutionId": "575ebbd5-f09a-4eef-8008-0d68a5405d79"
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
                "cursor": {
                    "ref": "5c221894-469a-4dd5-9f68-e2a3602a3c33",
                    "length": 2,
                    "cycles": 1,
                    "position": 1,
                    "iteration": 0,
                    "httpRequestId": "34e5b070-b356-4e0e-9f3a-d778361b92e3",
                    "scriptId": "e960807b-f4df-4532-819e-1d2c50625b2e",
                    "execution": "575ebbd5-f09a-4eef-8008-0d68a5405d79"
                }
            }
        ],
        "error": null
    }
};

let stats = jp.value(report, '$..stats');

//let executions = jp.query(report, '$..executions');

console.log("Stats:\n" + JSON.stringify(stats, null, 4));

//console.log("Executions:\n" + JSON.stringify(executions, null, 4));

const fields = ['total', 'pending', 'failed'];

const json2csvParser = new Json2csvParser({ fields });



const csv = json2csvParser.parse(stats);

console.log(csv);