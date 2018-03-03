'use strict';

exports.handler = (event, context, callback) => {

    let response;
    let body = {};

    body.message = ("Successful response v2.1");

    response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(body)
    };

    callback(null, response);
};