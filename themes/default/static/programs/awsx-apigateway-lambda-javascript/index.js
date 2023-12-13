"use strict";
const aws = require("@pulumi/aws");
const apigateway = require("@pulumi/aws-apigateway");

const handler = new aws.lambda.CallbackFunction("handler", {
    callback: async (event, context) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Hello from API Gateway!",
            }),
        };
    },
});

const api = new apigateway.RestAPI("api", {
    routes: [
        {
            path: "/",
            method: "GET",
            eventHandler: handler,
        },
    ],
});

exports.url = api.url;
