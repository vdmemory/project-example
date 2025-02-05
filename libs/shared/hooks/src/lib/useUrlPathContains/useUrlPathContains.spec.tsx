import { renderHook } from '@testing-library/react-hooks';
import { useUrlPathContains } from './useUrlPathContains';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        pathname: '',
    }),
}));

describe('useUrlPathContains', () => {
    it('should return true if pathname includes any of the given pathNames', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/projects/123/tasks',
        });

        const { result } = renderHook(() =>
            useUrlPathContains({
                pathNames: ['projects', 'tasks'],
            }),
        );

        expect(result.current.hasMatchedPath).toBe(true);
    });

    it('should return false if pathname does not include any of the given pathNames', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/dashboard',
        });

        const { result } = renderHook(() =>
            useUrlPathContains({
                pathNames: ['projects', 'tasks'],
            }),
        );

        expect(result.current.hasMatchedPath).toBe(false);
    });

    it('should return false if pathNames is empty', () => {
        (useRouter as jest.Mock).mockReturnValue({
            pathname: '/projects',
        });

        const { result } = renderHook(() =>
            useUrlPathContains({
                pathNames: [],
            }),
        );

        expect(result.current.hasMatchedPath).toBe(false);
    });
});
