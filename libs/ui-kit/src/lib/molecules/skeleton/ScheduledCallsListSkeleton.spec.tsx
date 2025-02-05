import { screen, render } from '@testing-library/react';

import {
    ScheduledCallsListSkeletonComponent,
    ScheduledCallsListSkeleton,
} from './ScheduledCallsListSkeleton.component';

import { useMediaContext } from '@breef/shared/hooks';

describe('ScheduledCallsListSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ScheduledCallsListSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

describe('ScheduledCallsListSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ScheduledCallsListSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('should display the correct number of skeletons, desktop version', () => {
        const { baseElement } = render(<ScheduledCallsListSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(6);
    });

    it('should display the correct types of skeletons, desktop version', () => {
        render(<ScheduledCallsListSkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(2);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(1);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(2);

        const avatarSkeletons = screen.getAllByTestId('skeleton-avatar');
        expect(avatarSkeletons.length).toBe(1);
    });

    it('should display the correct number of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        const { baseElement } = render(<ScheduledCallsListSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(5);
    });

    it('should display the correct types of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        render(<ScheduledCallsListSkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(1);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(1);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(2);

        const avatarSkeletons = screen.getAllByTestId('skeleton-avatar');
        expect(avatarSkeletons.length).toBe(1);
    });

    it('should include shimmer effect', () => {
        render(<ScheduledCallsListSkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
