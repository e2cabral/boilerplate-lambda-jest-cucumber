import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import {ok, serverError} from "../helpers/http.helper";

type QueryStringGetCarsParam = { model: string, make: string }

export const handle = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const { model, make } = event.queryStringParameters as QueryStringGetCarsParam;

    try {
        if ((!model && !make) || !make) {
            throw new Error('You must provide at least a make.');
        }

        return ok([{ model: 'a4', make: 'audi' }])
    } catch (err) {
        return serverError((err as Error))
    }
}