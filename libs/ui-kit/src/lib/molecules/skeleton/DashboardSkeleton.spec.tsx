import { render, screen } from '@testing-library/react';
import {
    DashboardSkeletonComponent,
    DashboardSkeleton,
} from './DashboardSkeleton.component';

describe('DashboardSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DashboardSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('DashboardSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<DashboardSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('should display the correct number of skeletons', () => {
        const { baseElement } = render(<DashboardSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(4);
    });

    it('should display the correct types of skeletons', () => {
        render(<DashboardSkeletonComponent />);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(3);

        const avatarSkeletons = screen.getAllByTestId('skeleton-avatar');
        expect(avatarSkeletons.length).toBe(1);
    });

    it('should include shimmer effect', () => {
        render(<DashboardSkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
