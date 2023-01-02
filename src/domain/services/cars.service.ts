export class CarsService {
    async getCars(make: string, model: string | null): Promise<Array<any>> {
        try {
            if ((!model && !make) || !make) {
                throw new Error('You must provide at the make make.');
            }

            return [];
        } catch (err: unknown) {
            throw new Error((err as Error).message);
        }
    }
}