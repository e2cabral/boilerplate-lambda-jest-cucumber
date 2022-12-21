import {APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyEvent} from "aws-lambda";
import {handle} from "../../src/handler/app";
import {ok, serverError} from "../../src/helpers/http.helper";

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

describe('Get information from the handler', () => {
    test(
        'Should return 200 if a model and a make were provided',
        async () => {
            const httpResponse = await handle(
                mockRequest('a4', 'audi')
            );

            expect(httpResponse).toEqual(ok([{ model: 'a4', make: 'audi' }]));
        }
    );

    test('Should return 400 if no make or model were provided', async () => {
        const httpResponse = await handle(
            mockRequest(null, null)
        );

        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse).toEqual(serverError(new Error('You must provide at least a make.')));
    })
})