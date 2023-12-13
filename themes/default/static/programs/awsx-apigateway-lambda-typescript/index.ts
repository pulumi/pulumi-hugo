import * as aws from "@pulumi/aws";
import * as apigateway from "@pulumi/aws-apigateway";

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

export const url = api.url;
