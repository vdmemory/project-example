import { screen, render } from '@testing-library/react';
import {
    IntroCallAvailabilitySkeletonComponent,
    IntroCallAvailabilitySkeleton,
} from './IntroCallAvailabilitySkeleton.component';
import { useMediaContext } from '@breef/shared/hooks';

describe('IntroCallAvailabilitySkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<IntroCallAvailabilitySkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

jest.mock('@breef/shared/hooks');
(useMediaContext as jest.Mock).mockImplementation(() => ({
    isMobile: false,
}));

describe('ProjectsSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <IntroCallAvailabilitySkeletonComponent />,
        );
        expect(baseElement).toBeTruthy();
    });

    it('should display the correct number of skeletons, desktop version', () => {
        const { baseElement } = render(
            <IntroCallAvailabilitySkeletonComponent />,
        );

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(15);
    });

    it('should display the correct types of skeletons, desktop version', () => {
        render(<IntroCallAvailabilitySkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(9);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(1);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(5);
    });

    it('should display the correct number of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        const { baseElement } = render(
            <IntroCallAvailabilitySkeletonComponent />,
        );

        const skeletons = baseElement.querySelectorAll('.skeleton');
        expect(skeletons.length).toBe(11);
    });

    it('should display the correct types of skeletons, mobile version', () => {
        (useMediaContext as jest.Mock).mockImplementation(() => ({
            isMobile: true,
        }));

        render(<IntroCallAvailabilitySkeletonComponent />);

        const textSkeletons = screen.getAllByTestId('skeleton-text');
        expect(textSkeletons.length).toBe(8);

        const titleSkeletons = screen.getAllByTestId('skeleton-title');
        expect(titleSkeletons.length).toBe(1);

        const thumbnailSkeletons = screen.getAllByTestId('skeleton-thumbnail');
        expect(thumbnailSkeletons.length).toBe(2);
    });

    it('should include shimmer effect', () => {
        render(<IntroCallAvailabilitySkeletonComponent />);

        const shimmer = screen.getByTestId('shimmer');
        expect(shimmer).toBeInTheDocument();
    });
});
