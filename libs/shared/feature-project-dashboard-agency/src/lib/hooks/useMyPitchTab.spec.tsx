import {
    useGetSharingPitchQuery,
    useLazyGetPitchByIdQuery,
    useUpdateIsSharingPitchMutation,
} from '@breef/shared/data-access-pitch-create';
import { useGetCompanyInfoQuery } from '@breef/shared/data-access-profile';

import { ReactNode } from 'react';

import { renderHook } from '@testing-library/react';
import { MockProjectDashboardProvider } from '../store/mockStore';
import { useMyPitchTab } from './useMyPitchTab';

jest.mock('@breef/shared/data-access-pitch-create', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-pitch-create'),
    useGetSharingPitchQuery: jest.fn(),
    useLazyGetPitchByIdQuery: jest.fn(),
    useUpdateIsSharingPitchMutation: jest.fn(),
}));

jest.mock('@breef/shared/data-access-profile', () => ({
    __esModule: true,
    ...jest.requireActual('@breef/shared/data-access-profile'),
    useGetCompanyInfoQuery: jest.fn(),
}));

const getPitchById = jest.fn();
const getCompanyInfo = jest.fn();
const updateIsSharingPitch = jest.fn();
const getSharingPitch = jest.fn();

beforeAll(() => {
    (useLazyGetPitchByIdQuery as jest.Mock).mockImplementation(() => [
        getPitchById,
        { data: {}, isLoading: false },
    ]);
    (useGetCompanyInfoQuery as jest.Mock).mockImplementation(() => [
        getCompanyInfo,
    ]);
    (useUpdateIsSharingPitchMutation as jest.Mock).mockImplementation(() => [
        updateIsSharingPitch,
    ]);
    (useGetSharingPitchQuery as jest.Mock).mockImplementation(() => [
        getSharingPitch,
    ]);
});

afterEach(() => {
    jest.clearAllMocks();
});

const wrapper = ({ children }: { children: ReactNode }) => (
    <MockProjectDashboardProvider>{children}</MockProjectDashboardProvider>
);

describe('useMyPitchTab', () => {
    it('hook useMyPitchTab render successfully', () => {
        const { result } = renderHook(
            () =>
                useMyPitchTab({
                    userType: 'agency',
                    pitchId: 23,
                    activeShare: true,
                }),
            { wrapper },
        );
        result.current.handleSetActiveSharing();
        expect(updateIsSharingPitch).toBeCalledTimes(1);
        expect(updateIsSharingPitch).toBeCalledWith({
            id: 23,
            isSharing: false,
            userType: 'agency',
        });
    });
});
