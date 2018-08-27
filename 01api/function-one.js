'use strict';

exports.handler = (event, context, callback) => {

    let response;
    let body = {};

    body.message = ("Successful reply from function 1 - v1.0");

    response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    callback(null, response);
};