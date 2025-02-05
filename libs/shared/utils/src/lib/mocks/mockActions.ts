type PromiseState = 'fulfilled' | 'rejected' | 'pending';

export const mockRtkQueryAction = (
    reducerPath: string,
    endpointName: string,
    promiseState: PromiseState,
    payload: unknown,
) => ({
    type: `${reducerPath}/executeQuery/${promiseState}`,
    payload,
    meta: {
        arg: {
            endpointName,
        },
    },
});
