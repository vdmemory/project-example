/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sendErrorToSentry } from './sendErrorToSentry';
import { ErrorLogging } from './initializeErrorLogging';
import { getAppType } from '../help-functions/getAppType';
import { gerErrorMessage } from './getErrorMessage';

jest.mock('./initializeErrorLogging', () => ({
    ErrorLogging: {
        withScope: jest.fn(),
        captureException: jest.fn(),
    },
}));
jest.mock('../help-functions/getAppType', () => ({
    getAppType: jest.fn(() => 'MockAppType'),
}));
jest.mock('./getErrorMessage', () => ({
    gerErrorMessage: jest.fn(() => 'MockErrorMessage'),
}));
jest.mock('./getSeverityType', () => ({
    getSeverityType: jest.fn(() => 'MockSeverityType'),
}));

describe('sendErrorToSentry', () => {
    const mockArgs = { method: 'POST', url: '/api/endpoint' };
    const mockApi = { type: 'query', endpoint: '/api/endpoint' };
    const mockOriginError = { status: 500 };
    const mockPathname = '/some/path';

    beforeAll(() => {
        // @ts-ignore
        sendErrorToSentry(mockArgs, mockApi, mockOriginError, mockPathname);
    });

    it('should call ErrorLogging.withScope with the correct parameters', () => {
        expect(ErrorLogging.withScope).toHaveBeenCalledWith(
            expect.any(Function),
        );
    });

    it('should get the correct app type', () => {
        expect(getAppType).toHaveBeenCalled();
    });

    it('should get the correct error message', () => {
        expect(gerErrorMessage).toHaveBeenCalledWith(mockOriginError.status);
    });
});
