import {APIGatewayEvent, APIGatewayProxyResult} from "aws-lambda";
import {ok, serverError} from "../helpers/http.helper";

export const handle = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        return ok([{ model: 'a4', make: 'audi' }])
    } catch (err) {
        return serverError((err as Error))
    }
}