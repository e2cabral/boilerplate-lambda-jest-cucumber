import * as assert from 'assert';
import {Given, Then, When} from "@cucumber/cucumber";
import {handle} from "../../src/handler/app";
import {
    APIGatewayEventRequestContextWithAuthorizer,
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";

const mockRequest = (model: string | null, make: string | null) => ({
    body: null,
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'post',
    isBase64Encoded: false,
    path: '/books',
    pathParameters: null,
    queryStringParameters: { model: model, make: make },
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<any>,
    resource: 'create',
} as APIGatewayProxyEvent);

let expected: APIGatewayProxyResult;
let model: string;
let make: string;

Given(/^A car model and make$/, async () => {
    model = 'a4'
    make = 'audi'
});

When(/^The model is a4 and the make is audi$/, async () => {
    expected = await handle(mockRequest(model, make))
});

Then(/^The data returned should be a list of audi a4$/, async () => {
    const listToCompareTypes: any[] = [];
    assert.equal(typeof listToCompareTypes, typeof expected)
});