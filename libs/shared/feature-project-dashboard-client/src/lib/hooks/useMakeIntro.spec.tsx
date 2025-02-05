import { useMakeIntro } from './useMakeIntro';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { act, renderHook } from '@testing-library/react';
import { MockDashboardProvider } from '../store/mockStore';

const wrapper = ({ children }: { children: ReactNode }) => (
    <MockDashboardProvider>{children}</MockDashboardProvider>
);

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('react-toastify');

const mockReplace = jest.fn();
const mockPush = jest.fn();
const onSuccess = jest.fn();

beforeAll(() => {
    (useRouter as jest.Mock).mockReturnValue({
        route: '/',
        replace: mockReplace,
        pathname: '',
        query: { projectId: 1 },
        asPath: '',
        push: mockPush,
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

const agencies = [
    {
        id: 1,
        logoUrl: 'logourl.com',
        name: 'test company',
        location: 'test location',
        schedule: false,
        isShortlisted: true,
        pitchId: 1,
    },
];

describe('useMakeIntro', () => {
    it('useMakeIntro should return selectedPitch with id 1', () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        expect(result.current.selectedIds).toEqual([1]);
    });

    it('isCheckedPitch should return  true', () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        expect(result.current.isCheckedAgency(1)).toEqual(true);
    });
    it('isCheckedPitch should return  false', () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        expect(result.current.isCheckedAgency(24)).toEqual(false);
    });
    it('handleSelectPitchToShortlist should return selectedPitch []', async () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        act(() => {
            result.current.handleSelectAgency(1);
        });

        expect(result.current.selectedIds).toEqual([]);
    });
    it('handleSelectPitchToShortlist should return selectedPitch [1]', async () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        act(() => {
            result.current.handleSelectAgency(1);
        });
        expect(result.current.selectedIds).toEqual([]);
        act(() => {
            result.current.handleSelectAgency(1);
        });
        expect(result.current.selectedIds).toEqual([1]);
    });
    it('handleSelectPitchToShortlist should return selectedPitch [1, 24]', async () => {
        const { result } = renderHook(
            () =>
                useMakeIntro({
                    agencies,
                    projectId: 25,
                    onSuccess,
                }),
            { wrapper },
        );

        act(() => {
            result.current.handleSelectAgency(24);
        });

        expect(result.current.selectedIds).toEqual([1, 24]);
    });
});
