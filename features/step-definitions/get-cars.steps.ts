import * as assert from 'assert';
import {Given, Then, When} from "@cucumber/cucumber";
import {handle} from "../../src/handler/app";
import {
    APIGatewayEventRequestContextWithAuthorizer,
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";
import {serverError} from "../../src/helpers/http.helper";

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

let actual: APIGatewayProxyResult;
let model: string;
let make: string;

//# region First Step
Given(/^A car model and make$/, async () => {
    model = 'a4'
    make = 'audi'
});

When(/^The model is a4 and the make is audi$/, async () => {
    actual = await handle(mockRequest(model, make))
});

Then(/^The data returned should be a list of audi a4$/, async () => {
    const listToCompareTypes: any[] = [];
    assert.equal(
        typeof listToCompareTypes,
        typeof actual.body,
        'The expected parameter is not equal to the default'
    );
});
//# endregion

//# region Second Step
When(/^No car model and make were provided$/, async () => {
    actual = await handle(mockRequest(null, null));
});

Then(/^Should return a http server error message$/, () => {
    const expected = serverError(new Error('You must provide at least a make.'));
    const actualToCompare = JSON.stringify(actual.body);

    assert.equal(actual.statusCode, expected.statusCode);
    assert.equal(JSON.parse(actualToCompare).name, expected.body.name);
})
//# endregion