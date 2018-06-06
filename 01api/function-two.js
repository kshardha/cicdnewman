'use strict';

exports.handler = (event, context, callback) => {

    let response;
    let body = {};

    body.message = ("Successful response from function 2 - v2.0");

    response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    callback(null, response);
};