import { render, screen } from '@testing-library/react';
import {
    BoxInfoSkeletonComponent,
    BoxInfoSkeleton,
} from './BoxInfoSkeleton.component';

describe('BoxInfoSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BoxInfoSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('BoxInfoSkeleton Component', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BoxInfoSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('should display the correct number of skeletons', () => {
        const { baseElement } = render(<BoxInfoSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(8);
    });

    it('should display the correct types of skeletons', () => {
        render(<BoxInfoSkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(1);

        const halfTextSkeletons = screen.getAllByTestId('skeleton-half-text');
        expect(halfTextSkeletons.length).toBe(3);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(2);

        const avatarSkeletons = screen.getAllByTestId('skeleton-avatar');
        expect(avatarSkeletons.length).toBe(2);
    });

    it('should include shimmer effect', () => {
        render(<BoxInfoSkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
