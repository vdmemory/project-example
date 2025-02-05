import { screen, render } from '@testing-library/react';
import {
    ProjectsSkeletonComponent,
    ProjectsSkeleton,
} from './ProjectsSkeleton.component';
import { useMediaContext } from '@breef/shared/hooks';

describe('ProjectsSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProjectsSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

describe('ProjectsSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ProjectsSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });

    it('should display the correct number of skeletons, desktop version', () => {
        const { baseElement } = render(<ProjectsSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(21);
    });

    it('should display the correct types of skeletons, desktop version', () => {
        render(<ProjectsSkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(12);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(6);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(3);
    });

    it('should display the correct number of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        const { baseElement } = render(<ProjectsSkeletonComponent />);

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(18);
    });

    it('should display the correct types of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        render(<ProjectsSkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(9);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(6);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(3);
    });

    it('should include shimmer effect', () => {
        render(<ProjectsSkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
