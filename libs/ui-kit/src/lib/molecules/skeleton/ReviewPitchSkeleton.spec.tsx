import { render } from '@testing-library/react';
import {
    ReviewPitchSkeletonComponent,
    ReviewPitchSkeleton,
} from './ReviewPitchSkeleton.component';

describe('ReviewPitchSkeleton Wrapper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReviewPitchSkeleton />);
        expect(baseElement).toBeTruthy();
    });
});

describe('ReviewPitchSkeletonComponent', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReviewPitchSkeletonComponent />);
        expect(baseElement).toBeTruthy();
    });
});
